import { useCallback, useState } from "react";
import MaximizeIcon from "../../assets/svgs/MaximizeIcon";
import MinimizeIcon from "../../assets/svgs/MinimizeIcon";
import MutedVolume from "../../assets/svgs/MutedVolume";
import PauseIcon from "../../assets/svgs/PauseIcon";
import PlayIcon from "../../assets/svgs/PlayIcon";
import RestartIcon from "../../assets/svgs/RestartIcon";
import SettingsIcon from "../../assets/svgs/SettingsIcon";
import VolumeLarge from "../../assets/svgs/VolumeLarge";
import VolumeSmall from "../../assets/svgs/VolumeSmall";
import { formatTime } from "../../utils";
import SettingsMenu, { closePlaybackMenu } from "./Settings/SettingsMenu";

interface VideoPlayerControlsProps {
  stopVideo: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
  duration: number;
  currentTime: number;
  volume: number;
  playVideo: () => void;
  isEnded: boolean;
  restartVideo: () => void;
  setSound: (volume: number) => void;
  toggleMute: () => void;
  muted: boolean;
  isFullScreen: boolean;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleFullScreen: () => void;
  playbackRate: number;
  changeVideoPlaybackRate: (speed: number) => void;
}

export let closeSettingsMenu: any;

function VideoPlayerControls({
  duration,
  currentTime,
  isPlaying,
  togglePlay,
  isEnded,
  restartVideo,
  setSound,
  volume,
  toggleMute,
  muted,
  isFullScreen,
  setIsFullScreen,
  toggleFullScreen,
  playbackRate,
  changeVideoPlaybackRate,
}: VideoPlayerControlsProps) {
  const VolumeIcon = useCallback(() => {
    if (volume === 0 || muted) {
      return <MutedVolume />;
    } else if (volume < 0.6) {
      return <VolumeSmall />;
    } else {
      return <VolumeLarge />;
    }
  }, [volume, muted]);

  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  closeSettingsMenu = () => {
    setIsSettingsMenuOpen(false);
  };

  return (
    <div className="VideoControls">
      <div className="d-flex-ac-jc">
        <div onClick={() => (!isEnded ? togglePlay() : restartVideo())} className="ControlIcon">
          {isEnded && currentTime == duration ? <RestartIcon /> : isPlaying ? <PauseIcon /> : <PlayIcon />}
        </div>
        <div className="d-flex-ac">
          <div style={{ cursor: "pointer" }} onClick={() => toggleMute()}>
            <VolumeIcon />
          </div>
          <div className="inputcontainer">
            <input
              style={{ cursor: "pointer" }}
              min={0}
              max={100}
              onChange={(e) => {
                setSound(parseFloat(e.target.value) / 100);
              }}
              value={muted ? 0 : volume * 100}
              type="range"
            />
          </div>
        </div>
        <div style={{ color: "white", marginLeft: 10 }}>{formatTime(currentTime!) + " / " + formatTime(duration!)}</div>
      </div>
      <div className="VideoControlsRight">
        <SettingsMenu
          changeVideoPlaybackRate={changeVideoPlaybackRate}
          currentPlaybackRate={playbackRate}
          isSettingsMenuOpen={isSettingsMenuOpen}
          setIsSettingsMenuOpen={setIsSettingsMenuOpen}
        />
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsSettingsMenuOpen((prev) => !prev);
            closePlaybackMenu();
          }}
        >
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
  );
}

export default VideoPlayerControls;
