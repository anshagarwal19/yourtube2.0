
import video from "../Modals/video.js";

export const uploadvideo = async (req, res) => {
  if (req.file === undefined) {
     return res
      .status(404)
      .json({ message: "plz upload a mp4 video file only" });
    // return res.status(404).json({ message: "plz upload a mp4 video file only" });
  } else {
    try {
      // Save video document with multiple quality filepaths
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
