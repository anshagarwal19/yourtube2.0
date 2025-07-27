"use client";

import { useRef, useEffect } from "react";

interface VideoPlayerProps {
  video: {
    _id: string;
    videotitle: string;
    filepath: string; // Base filepath, e.g., "videos/video123"
  };
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const getSrc = () => {
    return `${process.env.BACKEND_URL}/${video?.filepath}`;
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = getSrc();
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div>
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full"
          controls
          poster={`/placeholder.svg?height=480&width=854`}
        >
          <source src={getSrc()} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
