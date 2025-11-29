'use client';

import { useState, useEffect, useRef } from 'react';
import {
  pingHealth,
  fetchTimerState,
  fetchTimerStats,
  postTimerAction,
} from '@/lib/api/timer/timerClient';


const DEFAULT_TIMER_STATE = {
  isRunning: false,
  isFocus: true,
  timeLeft: 25 * 60,
  totalSessions: 0,
};

const DEFAULT_STATS = {
  totalSessions: 0,
  consecutiveSessions: 0,
  nextLongBreak: 4,
  isLongBreakNext: false,
};

export function useTimer() {
  const [timerState, setTimerState] = useState(DEFAULT_TIMER_STATE);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);

  const pollingRef = useRef(null);

  // ---- INITIALIZE APP ----
  useEffect(() => {
    initializeApp();

    // Cleanup polling when component unmounts
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function initializeApp() {
    try {
      // 1) Test backend connection
      await pingHealth();

      // 2) Load initial data
      const [state, statsData] = await Promise.all([
        fetchTimerState(),
        fetchTimerStats(),
      ]);

      setTimerState(state);
      setStats(statsData);
      setConnectionError(false);
      setIsLoading(false);

      // 3) Start polling
      startPolling(state.isRunning);
    } catch (err) {
      console.error('❌ Backend connection failed:', err);
      setConnectionError(true);
      setIsLoading(false);
    }
  }

  // ---- POLLING ----
  function startPolling(isRunning) {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }

    const interval = isRunning ? 1000 : 3000;

    pollingRef.current = setInterval(async () => {
      try {
        const state = await fetchTimerState();
        setTimerState(state);
        setConnectionError(false);
      } catch (err) {
        console.error('Error polling timer state:', err);
        setConnectionError(true);
      }
    }, interval);
  }

  // When isRunning / connectionError / isLoading change, adjust polling
  useEffect(() => {
    if (isLoading) return;
    if (connectionError) return;

    startPolling(timerState.isRunning);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerState.isRunning, connectionError, isLoading]);

  // ---- API ACTION WRAPPER ----
  async function handleAction(action) {
    try {
      const data = await postTimerAction(action);

      if (data.success) {
        setTimerState(data.state);
        setConnectionError(false);

        // small delay to let backend update stats, then refresh
        setTimeout(async () => {
          try {
            const statsData = await fetchTimerStats();
            setStats(statsData);
          } catch (err) {
            console.error('Error fetching stats after action:', err);
          }
        }, 100);
      }
    } catch (err) {
      console.error('API error:', err);
      setConnectionError(true);
    }
  }

  // ---- PUBLIC API (what the component uses) ----
  const startTimer = () => handleAction('start');
  const pauseTimer = () => handleAction('pause');
  const resetTimer = () => handleAction('reset');
  const switchMode = () => handleAction('switch');

  const retryConnection = () => {
    setIsLoading(true);
    initializeApp();
  };

  return {
    timerState,
    stats,
    isLoading,
    connectionError,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
    retryConnection,
  };
}
