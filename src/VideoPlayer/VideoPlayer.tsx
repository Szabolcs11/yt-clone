import { useEffect, useRef, useState } from "react";
import DurationLine from "./Components/DurationLine";

interface VideoType {
  url: string;
  currentTime: number;
  duration: number;
  volume: number;
  isPlaying: boolean;
}

interface VideoPlayerProps {
  url: string;
}

function VideoPlayer({ url }: VideoPlayerProps) {
  const [video, setVideo] = useState<VideoType | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number>();
  const [isLoading, setIsLoading] = useState(true);

  const updateCurrentTime = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      setVideo((prevVideo) => ({
        ...prevVideo!,
        currentTime,
      }));
    }
    animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        const currentTime = videoRef.current?.currentTime || 0;
        const duration = videoRef.current?.duration || 0;
        const volume = videoRef.current?.volume || 1;
        const isPlaying = !videoRef.current?.paused;
        setVideo({ url, currentTime, duration, volume, isPlaying });
        animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
        setIsLoading(false);
      };
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current!);
      if (videoRef.current) {
        videoRef.current.onloadedmetadata = null;
      }
    };
  }, [url]);

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setVideo((prevVideo) => ({ ...prevVideo!, isPlaying: false }));
    }
  };

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideo((prevVideo) => ({ ...prevVideo!, isPlaying: true }));
    }
  };

  const changeCurrentTime = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setVideo((prevVideo) => ({ ...prevVideo!, currentTime: time }));
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        playVideo();
      } else {
        stopVideo();
      }
    }
  };

  if (isLoading) {
    <div>
      <p>Loading...</p>
    </div>;
  }

  return (
    <div>
      <div className="VideoContainer">
        <video onMouseDown={togglePlay} ref={videoRef} autoPlay muted width={900}>
          <source src={url} type="video/mp4" />
        </video>
        <div className="VideoLineContainer">
          <DurationLine
            stopVideo={stopVideo}
            playVideo={playVideo}
            changeCurrentTime={changeCurrentTime}
            currentTime={video?.currentTime!}
            duration={video?.duration!}
          />
        </div>
      </div>
      <p>{JSON.stringify(video)}</p>
      <p>Current Time: {video?.currentTime}</p>
    </div>
  );
}

export default VideoPlayer;
