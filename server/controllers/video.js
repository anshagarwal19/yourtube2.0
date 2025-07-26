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
  const outputDir = path.join(process.cwd(), "server", "video", fileName);

  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Transcode to all resolutions and save Resolution documents
    const resolutionDocs = [];

    const transcodingTasks = resolutions.map(async ({ name, width, height }) => {
      const outputPath = path.join(outputDir, `${name}.mp4`);

      await new Promise((resolve, reject) => {
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

      // Create and save Resolution document
      const resolutionDoc = new Resolution({
        resolution: name,
        path: outputPath,
      });
      await resolutionDoc.save();
      resolutionDocs.push(resolutionDoc._id);
    });

    await Promise.all(transcodingTasks);

    // Save video data to DB with resolution ObjectIds
    const newVideo = new video({
      videotitle: req.body.videotitle,
      filename: req.file.originalname,
      filepath: outputDir,
      filetype: req.file.mimetype,
      filesize: req.file.size.toString(),
      resolutions: resolutionDocs,
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


export const getallvideo = async (req, res) => {
  try {
    const files = await video.find().populate("resolutions");
    return res.status(200).send(files);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
