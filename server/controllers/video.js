import video from "../Modals/video.js";
import fs from "fs";
import path from "path";

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

    // Save video data to DB without transcoding
    const newVideo = new video({
      videotitle: req.body.videotitle,
      filename: req.file.originalname,
      filepath: outputDir,
      filetype: req.file.mimetype,
      filesize: req.file.size.toString(),
      resolutions: [], // No transcoding, so empty resolutions
      videochanel: req.body.videochanel,
      uploader: req.body.uploader,
    });

    await newVideo.save();

    res.status(201).json({
      message: "Video uploaded successfully without transcoding",
      video: newVideo,
    });

  } catch (error) {
    console.error("Error during upload:", error);
    res.status(500).json({ message: "Something went wrong" });
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
