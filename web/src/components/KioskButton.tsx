import React, { useState, useRef } from 'react';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';

const KioskButton: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        wakeLockRef.current?.addEventListener('release', () => {
          console.log('Wake Lock released');
        });
        console.log('Wake Lock active');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(`Wake Lock error: ${err.name}, ${err.message}`);
      } else {
        console.error('Wake Lock error:', err);
      }
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
        await requestWakeLock(); // Request wake lock once fullscreen starts
      } catch (err) {
        console.error('Failed to enter fullscreen:', err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
        wakeLockRef.current?.release();
      } catch (err) {
        console.error('Failed to exit fullscreen:', err);
      }
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 9999,
        fontSize: '2rem',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        border: 'none',
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        cursor: 'pointer',
      }}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
      {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
    </button>
  );
};

export default KioskButton;
