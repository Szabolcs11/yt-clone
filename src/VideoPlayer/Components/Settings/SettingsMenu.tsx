import React, { useState } from "react";
import PlaybackSpeedIcon from "../../../assets/svgs/PlaybackSpeedIcon";
import QualityIcon from "../../../assets/svgs/QualityIcon";
import PlaybackRateMenu from "./PlaybackRateMenu";

interface SettingsMenuProps {
  isSettingsMenuOpen: boolean;
  setIsSettingsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentPlaybackRate: number;
  changeVideoPlaybackRate: (number: number) => void;
}

export let closePlaybackMenu: any;

function SettingsMenu({
  changeVideoPlaybackRate,
  currentPlaybackRate,
  isSettingsMenuOpen,
  setIsSettingsMenuOpen,
}: SettingsMenuProps) {
  const [isPlaybackSpeedMenuOpen, setIsPlaybackSpeedMenuOpen] = useState(false);

  closePlaybackMenu = () => {
    setIsPlaybackSpeedMenuOpen(false);
  };

  if (isPlaybackSpeedMenuOpen) {
    return (
      <PlaybackRateMenu
        changeVideoPlaybackRate={changeVideoPlaybackRate}
        setIsPlaybackSpeedMenuOpen={setIsPlaybackSpeedMenuOpen}
        setIsSettingsMenuOpen={setIsSettingsMenuOpen}
        currentPlaybackRate={currentPlaybackRate}
      />
    );
  }

  if (isSettingsMenuOpen) {
    return (
      <div className="VideoSettingsMenu">
        <div className="VideoSettingsMenuRow">
          <div className="VideoSettingsMenuRowLeft">
            <QualityIcon />
            <div>Quality</div>
          </div>
          <div>1080p</div>
        </div>
        <div
          className="VideoSettingsMenuRow"
          onClick={() => {
            setIsPlaybackSpeedMenuOpen(true);
          }}
        >
          <div className="VideoSettingsMenuRowLeft">
            <PlaybackSpeedIcon />
            <div>Playback Speed</div>
          </div>
          <div>{currentPlaybackRate == 1 ? "Normal (1x)" : `${currentPlaybackRate}x`}</div>
        </div>
      </div>
    );
  }
  return <></>;
}

export default SettingsMenu;
