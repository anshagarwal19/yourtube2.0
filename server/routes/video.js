import upload from "../filehelper/filehelper.js";
import express from "express";
import fs from "fs";
import path from "path";
import { getallvideo, uploadvideo } from "../controllers/video.js";
import VideoModel from "../Modals/video.js";

const router = express.Router();

// Upload video without transcoding
router.post("/upload", upload.single("video"), uploadvideo);

// Get all videos (you can customize this logic)
router.get("/getall", getallvideo);

export default router;
