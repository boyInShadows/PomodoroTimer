'use client';

import { useEffect, useState } from 'react';
import { useTimer } from '@/hooks/useTimer';
import ConnectionStatus from './ConnectionStatus';
import Header from './Header';
import CircularTimer from './CircularTimer';
import Controls from './Controls';
import ModeSwitch from './ModeSwitch';
import StatsSection from './StatsSection';
import Instructions from './Instructions';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';


export default function TimerApp() {
  const {
    timerState,
    stats,
    isLoading,
    connectionError,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
    retryConnection,
  } = useTimer();

// 1) Initialize darkMode from localStorage *inside useState*, not useEffect
const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      // During server render, window/localStorage don’t exist
      return false;
    }
    const savedMode = window.localStorage.getItem('darkMode');
    return savedMode === 'true';
  });
  
  // 2) Sync darkMode to localStorage whenever it changes
  useEffect(() => {
    // In the browser this will run after each change
    window.localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);
  

  // Save dark mode to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyPress(event) {
      if (event.code === 'Space') {
        event.preventDefault();
        if (timerState.isRunning) pauseTimer();
        else startTimer();
      }
      if (event.code === 'KeyR') {
        event.preventDefault();
        resetTimer();
      }
      if (event.code === 'KeyS') {
        event.preventDefault();
        switchMode();
      }
      if (event.code === 'KeyD') {
        event.preventDefault();
        setDarkMode((prev) => !prev);
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [timerState.isRunning, pauseTimer, startTimer, resetTimer, switchMode]);

  // Styles based on darkMode
  const styles = darkMode
    ? {
        main: 'min-h-screen bg-gray-900 text-white flex items-center justify-center p-4',
        card: 'bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6',
        textMuted: 'text-gray-400',
        buttonPrimary:
          'bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-medium transition-colors text-sm',
        buttonSecondary:
          'border border-gray-600 text-gray-300 hover:border-gray-500 px-8 py-3 rounded-lg font-medium transition-colors text-sm',
        progressBg: '#374151',
        progressFill: timerState.isFocus ? '#3b82f6' : '#10b981',
      }
    : {
        main: 'min-h-screen bg-white text-black flex items-center justify-center p-4',
        card: 'bg-white border border-gray-300 rounded-2xl shadow-xl p-6',
        textMuted: 'text-gray-500',
        buttonPrimary:
          'bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors text-sm',
        buttonSecondary:
          'border border-gray-300 text-gray-700 hover:border-gray-400 px-8 py-3 rounded-lg font-medium transition-colors text-sm',
        progressBg: '#f3f4f6',
        progressFill: timerState.isFocus ? '#3b82f6' : '#10b981',
      };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Connecting to backend...
          </p>
        </div>
      </div>
    );
  }

  // Connection error state
  if (connectionError) {
    return (
      <ConnectionStatus apiBaseUrl={API_BASE_URL} onRetry={retryConnection} />
    );
  }

  // Normal UI
  return (
    <div className={styles.main}>
      <div className={styles.card + ' w-full max-w-sm'}>
        {/* Connection Status Banner */}
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 rounded-lg text-green-700 dark:text-green-300 text-sm text-center">
          ✅ Connected to backend • {timerState.isRunning ? 'LIVE' : 'READY'}
        </div>

        <Header
          isFocus={timerState.isFocus}
          isRunning={timerState.isRunning}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode((prev) => !prev)}
          textMutedClass={styles.textMuted}
        />

        <CircularTimer
          timeLeft={timerState.timeLeft}
          isRunning={timerState.isRunning}
          isFocus={timerState.isFocus}
          textMutedClass={styles.textMuted}
          progressBg={styles.progressBg}
          progressFill={styles.progressFill}
        />

        <Controls
          isRunning={timerState.isRunning}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
          styles={styles}
        />

        <ModeSwitch
          isFocus={timerState.isFocus}
          onSwitch={switchMode}
        />

        <StatsSection stats={stats} textMutedClass={styles.textMuted} />

        <Instructions textMutedClass={styles.textMuted} />
      </div>
    </div>
  );
}
