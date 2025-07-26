import video from "../Modals/video.js";
import ffmpeg from "../utils/ffmpeg.js";
import fs from "fs";
import path from "path";

const resolutions = [
  { name: "320p", width: 426, height: 240 },
  { name: "480p", width: 854, height: 480 },
  { name: "720p", width: 1280, height: 720 },
  { name: "1080p", width: 1920, height: 1080 },
];

export const uploadvideo = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload a valid MP4 file." });
  }

  const inputPath = req.file.path;
  const fileName = path.parse(req.file.filename).name;
  const outputDir = `video/${fileName}`;

  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const resolutionsPaths = [];

    // Transcode to all resolutions
    const transcodingTasks = resolutions.map(({ name, width, height }) => {
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
          .on("error", (err) => {
            console.error(`${name} transcoding error`, err);
            reject(err);
          })
          .run();
      });
    });

    await Promise.all(transcodingTasks);

    // Save video data to DB
    const newVideo = new video({
      videotitle: req.body.videotitle,
      filename: req.file.originalname,
      filepath: req.file.path,
      filetype: req.file.mimetype,
      filesize: req.file.size.toString(),
      resolutions: resolutionsPaths,
      videochanel: req.body.videochanel,
      uploader: req.body.uploader,
    });

    await newVideo.save();

    res.status(201).json({
      message: "Video uploaded and transcoded successfully",
      video: newVideo,
    });

  } catch (error) {
    console.error("Error during upload and transcoding:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
