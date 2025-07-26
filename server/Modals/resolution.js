import mongoose from "mongoose";
const resolutionSchema = new mongoose.Schema(
  {
    resolution: {
      type: String,
      required: true,
      enum: ["360p", "480p", "720p", "1080p", "4K"],
      default: "720p",
    },
    path: { type: String, required: true, default: "720p.mp4" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resolution", resolutionSchema);
