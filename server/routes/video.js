
import upload from "../filehelper/filehelper.js";
import express from "express";
import fs from "fs";
import path from "path";
import ffmpeg from "../utils/ffmpeg.js";
import { getallvideo } from "../controllers/video.js";
import VideoModel from "../models/Video.js";

const router = express.Router();

const resolutions = [
  { name: "320p", width: 426, height: 240 },
  { name: "480p", width: 854, height: 480 },
  { name: "720p", width: 1280, height: 720 },
  { name: "1080p", width: 1920, height: 1080 },
];

// Upload and transcode video
router.post("/upload", upload.single("video"), async (req, res) => {
  const inputPath = req.file.path;
  const fileName = path.parse(req.file.filename).name;
  const outputDir = `video/${fileName}`;

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    const resolutionsPaths = [];

    const promises = resolutions.map(({ name, width, height }) => {
      const outputPath = `${outputDir}/${name}.mp4`;
      resolutionsPaths.push({ resolution: name, path: outputPath });

      return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .size(`${width}x${height}`)
          .output(outputPath)
          .on("end", () => {
            console.log(`${name} transcoding complete`);
            resolve();
          })
          .on("error", reject)
          .run();
      });
    });

    await Promise.all(promises);

    // Save metadata to database
    const videoDoc = new VideoModel({
      originalName: req.file.originalname,
      fileName,
      resolutions: resolutionsPaths, // [{ resolution: "320p", path: "..." }, ...]
      uploadDate: new Date()
    });

    await videoDoc.save();

    res.json({
      success: true,
      message: "Video transcoded and saved to DB successfully",
      resolutions: resolutionsPaths,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Transcoding or DB save failed" });
  }
});
// Get all videos (you can customize this logic)
router.get("/getall", getallvideo);

export default router;
