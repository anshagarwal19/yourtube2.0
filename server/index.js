import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userroutes from "./routes/auth.js";
import videoroutes from "./routes/video.js";
import likeroutes from "./routes/like.js";
import watchlaterroutes from "./routes/watchlater.js";
import historyrroutes from "./routes/history.js";
import commentroutes from "./routes/comment.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
  import videochema from "./Modals/video.js"; // Adjust the path to your model

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/video", express.static(path.join(__dirname, "video")));
app.get("/", (req, res) => {
  res.send("You tube backend is working");
});
app.use(bodyParser.json());
app.use("/user", userroutes);
app.use("/video", videoroutes);
app.use("/like", likeroutes);
app.use("/watch", watchlaterroutes);
app.use("/history", historyrroutes);
app.use("/comment", commentroutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

const DBURL = process.env.DB_URL;
mongoose
  .connect(DBURL)
  .then(() => {
    console.log("Mongodb connected");
    // insertResolution();
      // run();

  })
  .catch((error) => {
    console.log(error);
  });


  // const run = async () => {
  //   try {

  //     const newVideo = new videochema({
  //       videotitle: "Test Video",
  //       filename: "test-video.mp4",
  //       filetype: "video/mp4",
  //       filepath: "server/video/test-video", // relative path to folder
  //       filesize: "10485760", // 10MB in bytes
  //       resolutions: [
  //         { resolution: "320p", path: "server/video/test-video/320p.mp4" },
  //         { resolution: "480p", path: "server/video/test-video/480p.mp4" },
  //         { resolution: "720p", path: "server/video/test-video/720p.mp4" },
  //         { resolution: "1080p", path: "server/video/test-video/1080p.mp4" },
  //       ],
  //       videochanel: "Test Channel",
  //       uploader: "tester_user_01",
  //     });

  //     const saved = await newVideo.save();
  //     console.log("Video document saved:", saved);
  //   } catch (err) {
  //     console.error("Error saving video document:", err);
  //   } finally {
  //     await mongoose.disconnect();
  //   }
  // };


// async function insertResolution() {
//   try {
//     const exists = await resolutionSchema.findOne({ resolution: "1080p" });
//     if (!exists) {
//       await resolutionSchema.create({
//         resolution: "1080p",
//         path: "1080p.mp4",
//       });
//       console.log("Resolution inserted");
//     } else {
//       console.log("Resolution already exists");
//     }
//   } catch (err) {
//     console.error("Error inserting resolution:", err.message);
//   }
// }