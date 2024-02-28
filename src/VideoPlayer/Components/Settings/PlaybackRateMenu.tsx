import React from "react";
import BackIcon from "../../../assets/svgs/BackIcon";

interface PlaybackRateMenuProps {
  setIsPlaybackSpeedMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSettingsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentPlaybackRate: number;
  changeVideoPlaybackRate: (number: number) => void;
}

function PlaybackRateMenu({
  currentPlaybackRate,
  setIsPlaybackSpeedMenuOpen,
  setIsSettingsMenuOpen,
  changeVideoPlaybackRate,
}: PlaybackRateMenuProps) {
  return (
    <div className="VideoSettingsMenu">
      <div className="VideoSettingsHeader">
        <div
          style={{
            cursor: "pointer",
            width: 18,
            height: 24,
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
          onClick={() => {
            setIsSettingsMenuOpen(true);
            setIsPlaybackSpeedMenuOpen(false);
          }}
        >
          <BackIcon />
        </div>
        <div style={{ fontWeight: "600" }}>Playback Speed</div>
      </div>
      <div
        className={currentPlaybackRate == 0.25 ? "VideoSettingsMenuRowSelected" : "VideoSettingsMenuRow"}
        onClick={() => {
          changeVideoPlaybackRate(0.25);
          setIsPlaybackSpeedMenuOpen(false);
        }}
      >
        <div className="VideoSettingsMenuRowLeft">
          <div>0.25</div>
        </div>
      </div>
      <div
        className={currentPlaybackRate == 0.5 ? "VideoSettingsMenuRowSelected" : "VideoSettingsMenuRow"}
        onClick={() => {
          changeVideoPlaybackRate(0.5);
          setIsPlaybackSpeedMenuOpen(false);
        }}
      >
        <div className="VideoSettingsMenuRowLeft">
          <div>0.5</div>
        </div>
      </div>
      <div
        className={currentPlaybackRate == 1 ? "VideoSettingsMenuRowSelected" : "VideoSettingsMenuRow"}
        onClick={() => {
          changeVideoPlaybackRate(1);
          setIsPlaybackSpeedMenuOpen(false);
        }}
      >
        <div className="VideoSettingsMenuRowLeft">
          <div>Normal (1x)</div>
        </div>
      </div>
      <div
        className={currentPlaybackRate == 1.5 ? "VideoSettingsMenuRowSelected" : "VideoSettingsMenuRow"}
        onClick={() => {
          changeVideoPlaybackRate(1.5);
          setIsPlaybackSpeedMenuOpen(false);
        }}
      >
        <div className="VideoSettingsMenuRowLeft">
          <div>1.5</div>
        </div>
      </div>
      <div
        className={currentPlaybackRate == 2 ? "VideoSettingsMenuRowSelected" : "VideoSettingsMenuRow"}
        onClick={() => {
          changeVideoPlaybackRate(2);
          setIsPlaybackSpeedMenuOpen(false);
        }}
      >
        <div className="VideoSettingsMenuRowLeft">
          <div>2</div>
        </div>
      </div>
    </div>
  );
}

export default PlaybackRateMenu;
