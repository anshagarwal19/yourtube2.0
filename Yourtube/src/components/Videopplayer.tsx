"use client";

import { useRef, useEffect, useState } from "react";

interface VideoPlayerProps {
  video: {
    _id: string;
    videotitle: string;
    filepath: string; // Base filepath without resolution, e.g., "videos/video123"
  };
}

const resolutions = ["320p", "480p", "720p", "1080p"];

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedQuality, setSelectedQuality] = useState("480p");

  const getSrc = () => {
    return `${process.env.BACKEND_URL}/${video?.filepath}.mp4`;
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = getSrc();
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [selectedQuality]);

  return (
    <div>
      <div className="mb-2">
        <label htmlFor="quality" className="text-sm font-medium text-white mr-2">
          Quality:
        </label>
        <select
          id="quality"
          value={selectedQuality}
          onChange={(e) => setSelectedQuality(e.target.value)}
          className="px-2 py-1 rounded"
        >
          {resolutions.map((res) => (
            <option key={res} value={res}>
              {res}
            </option>
          ))}
        </select>
      </div>

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
