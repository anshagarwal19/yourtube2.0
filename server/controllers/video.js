
import video from "../Modals/video.js";
// import ffmpeg from "fluent-ffmpeg";
// import fs from "fs";
// import path from "path";

// const qualities = {
//   "144p": { width: 256, height: 144 },
//   "240p": { width: 426, height: 240 },
//   "360p": { width: 640, height: 360 },
//   "480p": { width: 854, height: 480 },
//   "720p": { width: 1280, height: 720 },
//   "1080p": { width: 1920, height: 1080 },
// };

// function transcodeVideo(inputPath, outputPath, width, height) {
//   return new Promise((resolve, reject) => {
//     ffmpeg(inputPath)
//       .outputOptions([
//         `-vf scale=w=${width}:h=${height}:force_original_aspect_ratio=decrease`,
//         "-c:a copy",
//       ])
//       .on("end", () => resolve(outputPath))
//       .on("error", (err) => reject(err))
//       .save(outputPath);
//   });
// }

export const uploadvideo = async (req, res) => {
  if (req.file === undefined) {
     return res
      .status(404)
      .json({ message: "plz upload a mp4 video file only" });
    // return res.status(404).json({ message: "plz upload a mp4 video file only" });
  } else {
    try {
      // const inputPath = req.file.path;
      // const outputDir = path.dirname(inputPath);
      // const originalFilename = path.parse(req.file.originalname).name;

      // const filepaths = {};

      // // Transcode video to multiple qualities
      // for (const [quality, size] of Object.entries(qualities)) {
      //   const outputFilename = `${originalFilename}-${quality}.mp4`;
      //   const outputPath = path.join(outputDir, outputFilename);
      //   await transcodeVideo(inputPath, outputPath, size.width, size.height);
      //   filepaths[quality] = outputPath;
      // }

      // // Save video document with multiple quality filepaths
      const file = new video({
        videotitle: req.body.videotitle,
        filename: req.file.originalname,
        filetype: req.file.mimetype,
        filepath: req.file.path,
        filesize: req.file.size,
        videochanel: req.body.videochanel,
        uploader: req.body.uploader,
        filepaths: filepaths,
      });
      await file.save();
      return res.status(201).json("file uploaded successfully");
      // // Optionally delete original uploaded file to save space
      // fs.unlink(inputPath, (err) => {
      //   if (err) console.error("Error deleting original file:", err);
      // });

      // return res.status(201).json("file uploaded and transcoded successfully");
    } catch (error) {
      console.error(" error:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const getallvideo = async (req, res) => {
  try {
    const files = await video.find();
    return res.status(200).send(files);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
