"use client";

import { useEffect, useState } from "react";

import useToggleTheme from "@/components/hooks/useTheme";

const BackgroundVideo = () => {
  const { theme, mounted } = useToggleTheme();
  const [videoSource, setVideoSource] = useState("/bg_vid/aru_default.mp4");

  useEffect(() => {
    if (mounted) {
      setVideoSource(
        theme === "dark" ? "/bg_vid/aru_ny.mp4" : "/bg_vid/aru_default.mp4"
      );
    }
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-background animate-pulse flex items-center justify-center">
      </div>
    );
  }

  return (
    <>
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src={videoSource}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay to Darken the Video */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-10"></div>
    </>
  );
};

export default BackgroundVideo;
