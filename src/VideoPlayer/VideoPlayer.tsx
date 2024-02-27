import { useEffect, useRef, useState } from "react";
import MaximizeIcon from "../assets/svgs/MaximizeIcon";
import MinimizeIcon from "../assets/svgs/MinimizeIcon";
import PlaybackSpeedIcon from "../assets/svgs/PlaybackSpeedIcon";
import QualityIcon from "../assets/svgs/QualityIcon";
import SettingsIcon from "../assets/svgs/SettingsIcon";
import DurationLine from "./Components/DurationLine";
import VideoPlayerControls from "./Components/VideoPlayerControls";

interface VideoType {
  url: string;
  currentTime: number;
  duration: number;
  volume: number;
  isPlaying: boolean;
  ended?: boolean;
  muted?: boolean;
}

interface VideoPlayerProps {
  url: string;
}

function VideoPlayer({ url }: VideoPlayerProps) {
  const [video, setVideo] = useState<VideoType | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const videoContainerRef = useRef<HTMLDivElement>(null);

  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

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
      videoRef.current.onloadeddata = () => {
        const currentTime = videoRef.current?.currentTime || 0;
        const duration = videoRef.current?.duration || 0;
        const volume = 1;
        const isPlaying = false;
        setVideo({ url, currentTime, duration, volume, isPlaying, ended: false, muted: false });
        animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
        setIsLoading(false);
        if (videoRef.current) {
          playVideo();
          videoRef.current.muted = false;
        }
      };

      videoRef.current.onended = () => {
        setVideo((prevVideo) => ({ ...prevVideo!, ended: true }));
        stopVideo();
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
      if (video?.ended === true && videoRef.current.currentTime !== videoRef.current.duration) {
        setVideo((prevVideo) => ({ ...prevVideo!, ended: false }));
      } else {
        setVideo((prevVideo) => ({ ...prevVideo!, currentTime: time }));
      }
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

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setVideo((prevVideo) => ({ ...prevVideo!, currentTime: 0, ended: false }));
      playVideo();
    }
  };

  const setSound = (volume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = false;
      setVideo((prevVideo) => ({ ...prevVideo!, volume, muted: volume > 0 ? false : true }));
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setVideo((prevVideo) => ({ ...prevVideo!, muted: !prevVideo?.muted }));
    }
  };

  const toggleFullScreen = () => {
    if (videoContainerRef.current) {
      if (!document.fullscreenElement) {
        videoContainerRef.current.requestFullscreen().catch((err) => {
          console.log("Error attempting to enable full screen:", err.message);
        });
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  if (isLoading) {
    <div>
      <p>Loading...</p>
    </div>;
  }

  return (
    <div>
      <div
        ref={videoContainerRef}
        className={`VideoContainer`}
        onMouseEnter={() => {
          setShowControls(true);
        }}
        onMouseLeave={() => {
          setShowControls(false);
          setIsSettingsMenuOpen(false);
        }}
      >
        <video onMouseDown={togglePlay} ref={videoRef} autoPlay muted width={"100%"} controls={false}>
          <source src={url} type="video/mp4" />
        </video>
        <div className={`VideoControlsContainer  ${showControls ? "visible" : "hidden"}`}>
          <DurationLine
            isPlaying={video?.isPlaying!}
            stopVideo={stopVideo}
            playVideo={playVideo}
            changeCurrentTime={changeCurrentTime}
            currentTime={video?.currentTime!}
            duration={video?.duration!}
          />
          <div className="VideoControls">
            <VideoPlayerControls
              muted={video?.muted!}
              toggleMute={toggleMute}
              setSound={setSound}
              restartVideo={restartVideo}
              isEnded={video?.ended!}
              stopVideo={stopVideo}
              playVideo={playVideo}
              togglePlay={togglePlay}
              currentTime={video?.currentTime!}
              duration={video?.duration!}
              volume={video?.volume!}
              isPlaying={video?.isPlaying!}
            />
            <div className="VideoControlsRight">
              {isSettingsMenuOpen ? (
                <div className="VideoSettingsMenu">
                  <div className="VideoSettingsMenuRow">
                    <div className="VideoSettingsMenuRowLeft">
                      <QualityIcon />
                      <div>Quality</div>
                    </div>
                    <div>1080p</div>
                  </div>
                  <div className="VideoSettingsMenuRow">
                    <div className="VideoSettingsMenuRowLeft">
                      <PlaybackSpeedIcon />
                      <div>Playback Speed</div>
                    </div>
                    <div>Normal (1)</div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div style={{ cursor: "pointer" }} onClick={() => setIsSettingsMenuOpen((prev) => !prev)}>
                <SettingsIcon />
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsFullScreen((prev) => !prev);
                  toggleFullScreen();
                }}
              >
                {isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>{JSON.stringify(video)}</p>
      <p>Current Time: {video?.currentTime}</p>
    </div>
  );
}

export default VideoPlayer;
