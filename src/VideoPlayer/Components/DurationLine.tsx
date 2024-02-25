import { useState } from "react";

interface VideoType {
  currentTime: number;
  duration: number;
  stopVideo: () => void;
  playVideo: () => void;
  changeCurrentTime: (time: number) => void;
}

function DurationLine({ currentTime, duration, stopVideo, playVideo, changeCurrentTime }: VideoType) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  return (
    <div
      className="VideoLine"
      onMouseDown={(e) => {
        stopVideo();
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        changeCurrentTime(duration * percentage);
        setIsMouseDown(true);
      }}
      onMouseMoveCapture={(e) => {
        if (isMouseDown) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const percentage = x / rect.width;
          changeCurrentTime(duration * percentage);
        }
      }}
      onMouseUp={() => {
        playVideo();
        setIsMouseDown(false);
      }}
    >
      <div
        style={{
          width: `${(currentTime / duration) * 100}%`,
          height: "100%",
          background: "red",
        }}
      />
    </div>
  );
}

export default DurationLine;
