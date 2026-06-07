import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const SignalAudioContext = createContext(null);

export function SignalAudioProvider({ children }) {
  const audioRef = useRef(null);
  const [signalAudioOn, setSignalAudioOn] = useState(false);

  const toggleSignalAudio = useCallback(() => {
    const audio = audioRef.current;

    if (signalAudioOn) {
      if (audio) {
        if (typeof audio.pause === 'function') audio.pause();
        audio.currentTime = 0;
      }
      setSignalAudioOn(false);
      return;
    }

    setSignalAudioOn(true);

    if (!audio) return;

    audio.volume = 0.62;
    audio.loop = true;
    if (typeof audio.play !== 'function') {
      setSignalAudioOn(false);
      return;
    }

    audio.play().catch(() => {
      setSignalAudioOn(false);
    });
  }, [signalAudioOn]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.62;
    audio.loop = true;

    if (!signalAudioOn) {
      if (typeof audio.pause === 'function') audio.pause();
      audio.currentTime = 0;
      return;
    }

    if (typeof audio.play !== 'function') {
      setSignalAudioOn(false);
      return;
    }

    audio.play().catch(() => {
      setSignalAudioOn(false);
    });
  }, [signalAudioOn]);

  const value = useMemo(
    () => ({
      signalAudioOn,
      setSignalAudioOn,
      toggleSignalAudio,
    }),
    [signalAudioOn, toggleSignalAudio],
  );

  return (
    <SignalAudioContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="metadata" aria-hidden="true">
        <source src="/lab/footeraudio.ogg" type="audio/ogg; codecs=opus" />
        <source src="/lab/footeraudio.mp3" type="audio/mpeg" />
      </audio>
    </SignalAudioContext.Provider>
  );
}

export function useSignalAudio() {
  const context = useContext(SignalAudioContext);
  if (!context) throw new Error('useSignalAudio must be used inside SignalAudioProvider');
  return context;
}
