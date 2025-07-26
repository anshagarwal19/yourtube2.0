import mongoose from "mongoose";
const resolutionSchema = new mongoose.Schema({
  resolution: {type:String, required: true },
  path: {type:String, required: true },
});
const videochema = mongoose.Schema(
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



