"use client";

import { useRef, useEffect, useState } from "react";

interface VideoPlayerProps {
  video: {
    _id: string;
    videotitle: string;
    filepaths: { [quality: string]: string };
  };
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedQuality, setSelectedQuality] = useState<string>("720p");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [selectedQuality, video]);

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuality(e.target.value);
  };

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        poster={`/placeholder.svg?height=480&width=854`}
        key={selectedQuality}
      >
        <source
          src={`${process.env.BACKEND_URL}/${video?.filepaths[selectedQuality]}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="mt-2 text-white">
        <label htmlFor="quality-select" className="mr-2">
          Quality:
        </label>
        <select
          id="quality-select"
          value={selectedQuality}
          onChange={handleQualityChange}
          className="bg-gray-800 text-white p-1 rounded"
        >
          {video &&
            Object.keys(video.filepaths).map((quality) => (
              <option key={quality} value={quality}>
                {quality}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}
