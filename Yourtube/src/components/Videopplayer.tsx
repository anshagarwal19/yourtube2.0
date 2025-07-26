"use client";

import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  video: {
    _id: string;
    videotitle: string;
    filepath: string; // e.g., "videos/video123.m3u8"
  };
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<videojs.Player | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    playerRef.current = videojs(videoRef.current, {
      controls: true,
      responsive: true,
      fluid: true,
      autoplay: false,
      preload: "auto",
      sources: [
        {
          src: `${process.env.BACKEND_URL}/${video.filepath}`,
          type: "application/x-mpegURL", // for HLS
        },
      ],
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [video.filepath]);

  return (
    <div className="my-4">
      <h2 className="text-white text-xl mb-2">{video.videotitle}</h2>
      <div data-vjs-player className="aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="video-js vjs-default-skin w-full h-full"
          controls
          playsInline
        />
      </div>
    </div>
  );
}
