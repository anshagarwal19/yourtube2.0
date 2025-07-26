import mongoose from "mongoose";

const resolutionSchema = new mongoose.Schema({
  resolution: {type:String, required: true,default: "720p"},
  path: {type:String, required: true,default: "720p.mp4"},
});
const videochema = new mongoose.Schema(
  {
    videotitle: { type: String, required: true },
    filename: { type: String, required: true },
    filetype: { type: String, required: true },
    filepath: { type: String, required: true },
    filesize: { type: String, required: true },
    resolutions: [resolutionSchema],
    videochanel: { type: String, required: true },
    Like: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    uploader: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("videofiles", videochema);
