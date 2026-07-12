import React, { useState, useRef, useEffect } from 'react';
import lagu from '../assets/music/lagu.mp3';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showControls, setShowControls] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(null);

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // ===== SET SRC LAGU =====
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = lagu;
      audioRef.current.load();
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current || !audioRef.current.src) {
      alert('File lagu tidak ditemukan!');
      return;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => {
        console.log('Error playing audio:', e);
      });
      setIsPlaying(true);
    }
  };

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolume = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
    setIsLoaded(true);
    console.log('✅ Lagu berhasil di-load!');
  };

  const handleError = (e) => {
    console.error('❌ Error loading audio:', e);
    setIsLoaded(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('error', handleError);
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });
    }
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('error', handleError);
      }
    };
  }, []);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* ===== AUDIO ===== */}
      <audio ref={audioRef} loop preload="auto" />

      {/* ===== KONTROL MUSIK ===== */}
      {showControls && (
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 w-72 border border-gray-200 dark:border-gray-700 relative"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <button
            onClick={() => setShowControls(false)}
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center text-sm font-bold shadow-lg transition-all hover:scale-110"
          >
            ✕
          </button>

          <div className="text-center mb-3">
            <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
              🎵 Blue - Yung Kai
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
            </p>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[40px]">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={progressPercent}
              onChange={handleSeek}
              className="flex-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[40px]">
              {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={togglePlay}
              disabled={!isLoaded}
              className={`w-10 h-10 rounded-full text-white transition-all flex items-center justify-center text-lg ${
                isLoaded ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>

            <div className="flex items-center gap-2 flex-1 mx-2">
              <span className="text-sm">🔊</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={handleVolume}
                className="flex-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
              />
            </div>
          </div>
        </div>
      )}

      {/* ===== TOMBOL FLOATING ===== */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-2xl hover:scale-105 relative"
        title="Buka Musik"
      >
        🎵
        {isPlaying && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;