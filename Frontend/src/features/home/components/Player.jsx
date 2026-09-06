import { useContext, useRef, useState } from "react";
import { SongContext } from "../song.context";
import { useSong } from "../hooks/useSong";
import "../style/player.scss";

const Player = () => {
  const { song } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      await audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      Math.max(audioRef.current.currentTime + seconds, 0),
      audioRef.current.duration || 0,
    );
  };

  const handleProgress = (event) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Number(event.target.value);
    setCurrentTime(Number(event.target.value));
  };

  const handleSpeedChange = (event) => {
    const speed = Number(event.target.value);
    setPlaybackRate(speed);
    if (audioRef.current) audioRef.current.playbackRate = speed;
  };

  const formatTime = (time) => {
    if (!Number.isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <section className="player" aria-label="Music player">
      <audio
        ref={audioRef}
        src={song?.url}
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration);
          setCurrentTime(0);
          setIsPlaying(false);
        }}
        onTimeUpdate={(event) =>
          setCurrentTime(event.currentTarget.currentTime)
        }
        onEnded={() => setIsPlaying(false)}
      />

      <div className="player__identity">
        <img src={song?.poster_url} alt="" className="player__poster" />
        <div>
          <p className="player__eyebrow">Now playing</p>
          <h2>{song?.title || "Choose a song"}</h2>
        </div>
      </div>

      <div className="player__timeline">
        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(currentTime, duration || 0)}
          onChange={handleProgress}
          aria-label="Song progress"
        />
        <div className="player__time">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player__controls">
        <button
          type="button"
          onClick={() => skip(-5)}
          aria-label="Back 5 seconds"
        >
          <span aria-hidden="true">-5</span>
        </button>
        <button
          type="button"
          className="player__play"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          <span aria-hidden="true">{isPlaying ? "||" : ">"}</span>
        </button>
        <button
          type="button"
          onClick={() => skip(5)}
          aria-label="Forward 5 seconds"
        >
          <span aria-hidden="true">+5</span>
        </button>
      </div>

      <label className="player__speed">
        Speed
        <select
          value={playbackRate}
          onChange={handleSpeedChange}
          aria-label="Playback speed"
        >
          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
            <option key={speed} value={speed}>
              {speed}x
            </option>
          ))}
        </select>
      </label>
    </section>
  );
};

export default Player;
