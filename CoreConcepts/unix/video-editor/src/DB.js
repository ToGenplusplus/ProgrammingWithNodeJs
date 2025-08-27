const fs = require("node:fs");

const usersPath = "./data/users";
const sessionsPath = "./data/sessions";
const videosPath = "./data/videos";

class DB {
  constructor() {
    /*
     A sample object in this users array would look like:
     { id: 1, name: "Liam Brown", username: "liam23", password: "string" }
    */
    this.users = JSON.parse(fs.readFileSync(usersPath, "utf8"));

    /*
     A sample object in this sessions array would look like:
     { userId: 1, token: 23423423 }
    */
    this.sessions = JSON.parse(fs.readFileSync(sessionsPath, "utf8"));

    /*
      {"id": 1,"videoId": "12345","name": "sample","extension": "mp4","dimensions": {"width": 1920,"height": 1080},"userId": 1,"extractedAudio": false,"resizes": {}}
    */
    this.videos = JSON.parse(fs.readFileSync(videosPath, "utf8"));
  }

  update() {
    this.users = JSON.parse(fs.readFileSync(usersPath, "utf8"));
    this.sessions = JSON.parse(fs.readFileSync(sessionsPath, "utf8"));
    this.videos = JSON.parse(fs.readFileSync(videosPath, "utf8"));
  }

  save() {
    fs.writeFileSync(usersPath, JSON.stringify(this.users));
    fs.writeFileSync(sessionsPath, JSON.stringify(this.sessions));
    fs.writeFileSync(videosPath, JSON.stringify(this.videos));
  }

  getVideoMetadata(videoId) {
    this.update();
    const video = this.videos.find((video) => video.videoId === videoId);
    if (!video) {
      return null;
    }
    return video;
  }

  updateVideoMetadata(videoId, metadata) {
    this.update();
    const index = this.videos.findIndex((video) => video.videoId === videoId);
    if (index === -1) {
      return null;
    }
    this.videos[index] = { ...this.videos[index], ...metadata };
    this.save();
    return this.videos[index];
  }
}

const db = new DB();

module.exports = db;
