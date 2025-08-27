const { spawn } = require("child_process");
const { pipeline } = require("node:stream/promises");
const fs = require("node:fs/promises");
const crypto = require("node:crypto");
const path = require("node:path");

const videosStoragePath = `${__dirname}/../storage`;
const utils = require("./util");
const db = require("../src/DB");

const createThumbnail = (videoPath, thumbnailPath) => {
  return new Promise((resolve, reject) => {
    const args = `-y -i ${videoPath} -ss 5 -vframes 1 ${thumbnailPath}`.split(
      " "
    );
    const ffmpeg = spawn("ffmpeg", args);

    ffmpeg.on("close", async (code) => {
      if (code !== 0) {
        reject(new Error(`ffmpeg process exited with code ${code}`));
      } else {
        let fd;
        try {
          fd = await fs.open(thumbnailPath);
        } catch (err) {
          reject(new Error(`Thumbnail file does not exist: ${err}`));
        }
        fd.close();
        resolve();
      }
    });
  });
};

const extractAudioFromVideo = (videoPath) => {
  return new Promise((resolve, reject) => {
    const args =
      `-v quiet -print_format json -show_format -show_streams ${videoPath}`.split(
        " "
      );
    const ffprobe = spawn("ffprobe", args);
    let ffprobeData = [];
    ffprobe.stdout.on("data", (data) => {
      ffprobeData.push(data);
    });
    ffprobe.stderr.on("data", (data) => {
      console.error(`ffprobe stderr: ${data}`);
    });
    ffprobe.on("close", async (code) => {
      if (code !== 0) {
        reject(new Error(`ffprobe process exited with code ${code}`));
      } else {
        const ffprobeOutput = JSON.parse(ffprobeData.join(""));
        const audioStream = ffprobeOutput.streams.find(
          (stream) => stream.codec_type === "audio"
        );
        if (!audioStream) {
          reject(new Error("No audio stream found"));
        } else {
          const audioCodec = audioStream.codec_name;
          const audioPath = videoPath
            .replace(/\.[^.]+$/, `.${audioCodec}`)
            .replace("original", "audio");
          const args =
            `-y -i ${videoPath} -vn -acodec ${audioCodec} ${audioPath}`.split(
              " "
            );
          const ffmpeg = spawn("ffmpeg", args);
          ffmpeg.on("close", async (code) => {
            if (code !== 0) {
              reject(new Error(`ffmpeg process exited with code ${code}`));
            } else {
              resolve(true);
            }
          });
        }
      }
    });
  });
};

const getVideoDimensions = (videoPath) => {
  return new Promise((resolve, reject) => {
    const args =
      `-v error -select_streams v:0 -show_entries stream=width,height -of json=c=1 ${videoPath}`.split(
        " "
      );
    const ffProbe = spawn(`ffprobe`, args);

    let results;

    let ffProbeData = [];

    ffProbe.stdout.on("data", (data) => {
      ffProbeData.push(data);
    });

    ffProbe.stderr.on("data", (data) => {
      console.error(`ffprobe stderr: ${data}`);
    });
    ffProbe.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`ffprobe process exited with code ${code}`));
      } else {
        try {
          results = JSON.parse(ffProbeData.join(""));
        } catch (error) {
          reject(new Error(`Error parsing ffprobe output: ${error}`));
        }
        const { width, height } = results.streams[0];
        resolve({ width, height });
      }
    });
  });
};

const storeVideoFile = async (req) => {
  const videoId = crypto.randomBytes(4).toString("hex");
  const response = {
    status: "success",
    videoId,
    name: "",
    extension: "",
    error: null,
  };
  try {
    const filename = req.headers.filename;
    const extension = path.extname(filename).substring(1).toLocaleLowerCase();
    const name = path.parse(filename).name;

    await fs.mkdir(`${videosStoragePath}/${videoId}`);
    const fullPath = `${videosStoragePath}/${videoId}/original.${extension}`;
    const file = await fs.open(fullPath, "w");
    const fileStream = file.createWriteStream();
    await pipeline(req, fileStream);
    response.name = name;
    response.extension = extension;
  } catch (error) {
    await utils.deleteFolder(`${videosStoragePath}/${videoId}`);
    if (error.code !== "ECONNRESET") {
      console.error("Error storing video file:", error);
      response.error = error;
      response.status = "failed";
    }
  }
  return response;
};

const handleVideoResizeRequest = async (videoId, width, height) => {
  return new Promise(async (resolve, reject) => {
    try {
      let videoMetaData = db.getVideoMetadata(videoId);
      const resizeKey = `${width}x${height}`;

      if (!videoMetaData) {
        return reject(new Error("Video not found"));
      }

      videoMetaData.resizes[resizeKey] = {
        processing: true,
      };
      db.updateVideoMetadata(videoId, videoMetaData);

      const orignalVideoPath = path.join(
        videosStoragePath,
        videoId,
        `original.${videoMetaData.extension}`
      );
      const resizedVideoPath = path.join(
        videosStoragePath,
        videoId,
        `${resizeKey}.${videoMetaData.extension}`
      );
      try {
        const fd = await fs.open(resizedVideoPath, "r");
        fd.close();
        await fs.unlink(resizedVideoPath);
      } catch (error) {
        // file does not exist
        // do nothing
      }

      const args =
        `-i ${orignalVideoPath} -y -threads 2 -vf scale=${width}:${height} ${resizedVideoPath}`.split(
          " "
        );
      const ffmpeg = spawn("ffmpeg", args);
      ffmpeg.on("close", async (code) => {
        if (code !== 0) {
          await utils.deleteFile(resizedVideoPath);
          reject(
            new Error(`ffmpeg video resize process exited with code ${code}`)
          );
        } else {
          videoMetaData = db.getVideoMetadata(videoId);
          videoMetaData.resizes[resizeKey] = {
            processing: false,
          };
          db.updateVideoMetadata(videoId, videoMetaData);
          resolve(true);
        }
      });
    } catch (error) {
      reject(new Error(`Error processing video resize: ${error}`));
    }
  });
};

const storeVideoMetadata = (metadata) => {
  db.update();

  const video = {
    id: db.videos.length,
    extension: metadata.extension,
    extractedAudio: false,
    dimensions: metadata.dimensions,
    name: metadata.name,
    resizes: {},
    videoId: metadata.videoId,
    userId: metadata.userId,
  };
  // most recent video at the index[0]
  db.videos.unshift(video);
  db.save();
};

module.exports = {
  createThumbnail,
  extractAudioFromVideo,
  getVideoDimensions,
  storeVideoFile,
  storeVideoMetadata,
  handleVideoResizeRequest,
};
