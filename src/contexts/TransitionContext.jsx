import { createContext, useContext, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const [state, setState] = useState({ active: false, meta: null, phase: 'idle' });
  const timerRefs = useRef([]);

  const clearTimers = () => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  };

  const after = (ms, fn) => {
    const id = setTimeout(fn, ms);
    timerRefs.current.push(id);
  };

  // Full red-wipe transition — used when entering a case from outside
  const navigateWithWipe = useCallback((href, meta = {}) => {
    clearTimers();
    setState({ active: true, meta, phase: 'wipe-in' });

    // Navigate after wipe fully covers the screen (320ms CSS transition + 20ms buffer)
    after(340, () => {
      setState(s => ({ ...s, phase: 'title-card' }));
      navigate(href);
    });

    // Title card visible for ~660ms — enough to read project id + title
    after(1000, () => setState(s => ({ ...s, phase: 'wipe-out' })));
    after(1340, () => setState({ active: false, meta: null, phase: 'idle' }));
  }, [navigate]);

  // Soft slide — used for prev/next within cases
  const navigateWithSlide = useCallback((href, direction = 'next') => {
    clearTimers();
    setState({ active: true, meta: { slideDir: direction }, phase: 'slide-out' });

    after(200, () => {
      navigate(href);
      setState(s => ({ ...s, phase: 'slide-in' }));
    });

    after(500, () => setState({ active: false, meta: null, phase: 'idle' }));
  }, [navigate]);

  return (
    <TransitionContext.Provider value={{ state, navigateWithWipe, navigateWithSlide }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('usePageTransition must be used inside TransitionProvider');
  return ctx;
}
