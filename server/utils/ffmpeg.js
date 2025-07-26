// utils/ffmpeg.js
import ffmpegLib from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";

ffmpegLib.setFfmpegPath(ffmpegInstaller.path);
ffmpegLib.setFfprobePath(ffprobeInstaller.path);

export default ffmpegLib;
