// import ffmpegLib from "fluent-ffmpeg";
// import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
// import ffprobeInstaller from "@ffprobe-installer/ffprobe";

// ffmpegLib.setFfmpegPath(ffmpegInstaller.path);
// ffmpegLib.setFfprobePath(ffprobeInstaller.path);

// export default ffmpegLib;

// utils/ffmpeg.js
// import ffmpegLib from "fluent-ffmpeg";
// import ffmpegPath from "ffmpeg-static";
// import ffprobePath from "ffprobe-static";

// ffmpegLib.setFfmpegPath(ffmpegPath);
// ffmpegLib.setFfprobePath(ffprobePath);

// export default ffmpegLib;


// utils/ffmpeg.js
import ffmpegLib from "fluent-ffmpeg";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static");

ffmpegLib.setFfmpegPath(ffmpegPath);
ffmpegLib.setFfprobePath(ffprobePath);

export default ffmpegLib;

