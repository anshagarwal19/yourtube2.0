"use client";

import { useRef, useEffect, useState } from "react";

interface VideoPlayerProps {
  video: {
    _id: string;
    videotitle: string;
    filepaths: { [quality: string]: string };
  };
  backendUrl?: string;
}

export default function VideoPlayer({ video, backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedQuality, setSelectedQuality] = useState<string>("1080p");

  const qualities = Object.keys(video.filepaths || {}).sort((a, b) => {
    // Sort qualities by resolution descending
    const getHeight = (q: string) => parseInt(q.replace("p", ""));
    return getHeight(b) - getHeight(a);
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      // Attempt to play video, catch errors silently
      videoRef.current.play().catch(() => {});
    }
  }, [selectedQuality, video.filepaths]);

  const videoSrc = backendUrl && video.filepaths[selectedQuality]
    ? `${backendUrl}/${video.filepaths[selectedQuality]}`
    : "";

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <video
        key={selectedQuality} // key to reload video on quality change
        ref={videoRef}
        className="w-full h-full"
        controls
        poster={`/placeholder.svg?height=480&width=854`}
      >
        {videoSrc && <source src={videoSrc} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>
      <div className="mt-2 flex justify-center space-x-2">
        {qualities.map((quality) => (
          <button
            key={quality}
            className={`px-3 py-1 rounded ${
              quality === selectedQuality
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => setSelectedQuality(quality)}
            type="button"
          >
            {quality}
          </button>
        ))}
      </div>
    </div>
  );
}
