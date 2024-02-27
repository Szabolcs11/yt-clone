import { useCallback } from "react";
import MutedVolume from "../../assets/svgs/MutedVolume";
import PauseIcon from "../../assets/svgs/PauseIcon";
import PlayIcon from "../../assets/svgs/PlayIcon";
import RestartIcon from "../../assets/svgs/RestartIcon";
import VolumeLarge from "../../assets/svgs/VolumeLarge";
import VolumeSmall from "../../assets/svgs/VolumeSmall";
import { formatTime } from "../../utils";

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
}

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
  return (
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
  );
}

export default VideoPlayerControls;
