import { useState, useRef, useEffect } from "react";
import StopIcon from "../assets/icons/StopIcon";
import PlayIcon from "../assets/icons/PlayIcon";
import PauseIcon from "../assets/icons/PauseIcon";
import VolumeIcon from "../assets/icons/VolumeIcon";
import MuteIcon from "../assets/icons/MuteIcon";

function formatTimeToFarsi(seconds) {
  if (isNaN(seconds)) return "۰۰:۰۰";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const toFarsiDigits = (num) =>
    num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  return `${toFarsiDigits(m.toString().padStart(2, "0"))}:${toFarsiDigits(
    s.toString().padStart(2, "0"),
  )}`;
}

export default function CustomAudioPlayer({ src }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleStop() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  }

  function handleVolumeChange(e) {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    audioRef.current.volume = vol;
    setIsMuted(vol === 0);
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 1;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  }

  function handleSeek(e) {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }

  return (
    <div
      dir="ltr"
      className="custom-audio-player bg-light-gray flex items-center space-x-1 self-center rounded-md px-2"
      style={{ maxWidth: 519 }}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Stop Button */}
      <button onClick={handleStop} aria-label="توقف پخش" className="p-1">
        <StopIcon className="h-6 w-6 text-gray-700 hover:text-red-500" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "توقف" : "پخش"}
        className="p-1"
      >
        {isPlaying ? (
          <PauseIcon className="h-6 w-6 text-gray-700 hover:text-green-500" />
        ) : (
          <PlayIcon className="h-6 w-6 text-gray-700 hover:text-green-500" />
        )}
      </button>

      {/* Playbar */}
      <input
        type="range"
        min={0}
        max={duration}
        step={0.01}
        value={currentTime}
        onChange={handleSeek}
        className="flex-1 cursor-pointer"
        style={{
          accentColor: "#00BA9F",
          height: "4px",
          borderRadius: "2px",
        }}
      />

      {/* Current Time */}
      <span className="w-14 text-sm text-gray-600 select-none">
        {formatTimeToFarsi(currentTime)}
      </span>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "بی‌صدا کردن لغو" : "بی‌صدا کردن"}
        className="p-1"
      >
        {isMuted ? (
          <MuteIcon className="h-5 w-5 text-gray-700 hover:text-red-500" />
        ) : (
          <VolumeIcon className="h-5 w-5 text-gray-700 hover:text-green-500" />
        )}
      </button>

      {/* Volume Bar */}
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
        className="w-24 cursor-pointer"
        style={{
          accentColor: "#00BA9F",
          height: "4px",
          borderRadius: "2px",
        }}
      />
    </div>
  );
}
