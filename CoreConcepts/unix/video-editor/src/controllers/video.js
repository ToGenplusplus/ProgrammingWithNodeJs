const path = require("node:path");
const fs = require("node:fs/promises");
const cluster = require("node:cluster");

const {
  createThumbnail,
  extractAudioFromVideo,
  getVideoDimensions,
  storeVideoFile,
  storeVideoMetadata,
} = require("../../lib/videoUtils");

const db = require("../DB");

const vidoesDbPath = path.join(__dirname, "../../data/videos");
const videosStoragePath = path.join(__dirname, "../../storage");

let videoResizeJobQueue;
if (cluster.isPrimary) {
  const JobQueue = require("../../lib/jobQueue");
  videoResizeJobQueue = new JobQueue();
}

const extractAudio = async (req, res, handleErr) => {
  try {
    const videoId = req.params.get("videoId");
    if (!videoId) {
      return res.status(400).json({
        status: "failed",
        message: "Missing videoId",
      });
    }

    db.update();

    const videoMetaData = db.getVideoMetadata(videoId);

    if (!videoMetaData) {
      return res.status(404).json({
        status: "failed",
        message: "Video not found",
      });
    }
    if (videoMetaData.extractedAudio) {
      return res.status(400).json({
        status: "failed",
        message: "Audio already extracted",
      });
    }
    const videoPath = path.join(
      videosStoragePath,
      videoId,
      `original.${videoMetaData.extension}`
    );

    const audioExtracted = await extractAudioFromVideo(videoPath);
    if (!audioExtracted) {
      return res.status(500).json({
        status: "failed",
        message: "Error extracting audio",
      });
    }
    videoMetaData.extractedAudio = true;
    db.updateVideoMetadata(videoId, videoMetaData);
    res.status(200).json({
      status: "success",
      message: "Audio extracted successfully",
    });
  } catch (error) {
    return handleErr(error);
  }
};

const resize = async (req, res, handleErr) => {
  const videoId = req.body.videoId;
  const height = Number(req.body.height);
  const width = Number(req.body.width);

  try {
    if (!videoId || !height || !width) {
      return res.status(400).json({
        status: "failed",
        message:
          "A requied field is missing, ensure videoId, height and width are provided",
      });
    }

    if (cluster.isPrimary) {
      videoResizeJobQueue.enqueueJob({
        type: "resize",
        id: `${videoId}-${width}-${height}`,
        job: async () => {
          return await handleVideoResizeRequest(videoId, width, height);
        },
      });
    } else {
      process.send({
        operation: "resize",
        videoId,
        height,
        width,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Video resize started",
    });
  } catch (error) {
    return handleErr(error);
  }
};

const getVideos = async (req, res, handleErr) => {
  try {
    db.update();
    const user = req.userId;
    const videosFile = await fs.open(vidoesDbPath, "r");
    const videos = await videosFile.readFile();
    const userVideos = JSON.parse(videos).filter(
      (video) => video.userId === user
    );
    await videosFile.close();
    res.status(200).json(userVideos);
  } catch (error) {
    handleErr(error);
  }
};

const uploadVideo = async (req, res, handleErr) => {
  try {
    const metadata = await storeVideoFile(req);
    if (metadata.status === "failed") {
      return handleErr(err);
    }

    const videoFilePath = `${videosStoragePath}/${metadata.videoId}/original.${metadata.extension}`;
    const thumbnailFilePath = `${videosStoragePath}/${metadata.videoId}/thumbnail.jpg`;
    await createThumbnail(videoFilePath, thumbnailFilePath);
    const dimensions = await getVideoDimensions(videoFilePath);
    storeVideoMetadata({ ...metadata, dimensions, userId: req.userId });

    res.status(200).json({
      status: "success",
      message: "File was successfully uploaded",
    });
  } catch (err) {
    return handleErr(err);
  }
};

const getVideoAssets = (req, res, handleErr) => {
  try {
    const videoId = req.params.get("videoId");
    const type = req.params.get("type");
    let dimensions;

    if (!videoId || !type) {
      return res.status(400).json({
        status: "failed",
        message: "Missing videoId or type",
      });
    }
    if (!["thumbnail", "original", "audio", "resize"].includes(type)) {
      return res.status(400).json({
        status: "failed",
        message:
          "Invalid video asset type, must be one of: thumbnail, original, audio, resize",
      });
    }
    if (type === "resize") {
      dimensions = req.params.get("dimensions");
      if (!dimensions) {
        return res.status(400).json({
          status: "failed",
          message: "Missing dimensions for resized video request",
        });
      }
    }

    const videoMetaData = db.getVideoMetadata(videoId);
    if (!videoMetaData) {
      return res.status(404).json({
        status: "failed",
        message: "Video not found",
      });
    }

    const videoAssetPath = getVideoAssetPathForType(
      type,
      videoMetaData,
      dimensions
    );

    res.sendFile(videoAssetPath.path, videoAssetPath.mime);
  } catch (error) {
    return handleErr(error);
  }
};

const getVideoAssetPathForType = (type, videoMetaData, dimensions) => {
  const videoPath = path.join(videosStoragePath, videoMetaData.videoId);
  switch (type) {
    case "thumbnail":
      return { path: `${videoPath}/thumbnail.jpg`, mime: "image/jpeg" };
    case "original":
      return {
        path: `${videoPath}/original.${videoMetaData.extension}`,
        mime: `video/${videoMetaData.extension}`,
      };
    case "audio":
      return { path: `${videoPath}/audio.aac`, mime: `audio/aac` };
    case "resize":
      return {
        path: `${videoPath}/${dimensions}.${videoMetaData.extension}`,
        mime: `video/${videoMetaData.extension}`,
      };
    default:
      return null;
  }
};

const video = {
  getVideos,
  uploadVideo,
  extractAudio,
  resize,
  getVideoAssets,
};

module.exports = video;
