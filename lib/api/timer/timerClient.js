const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

function withBase(path) {
  return `${API_BASE_URL}${path}`;
}

// Health check
export async function pingHealth() {
  const res = await fetch(withBase('/api/health'));
  if (!res.ok) throw new Error('Backend not responding');
  return res.json(); // optional: data from health endpoint
}

// Timer state
export async function fetchTimerState() {
  const res = await fetch(withBase('/api/timer/state'));
  if (!res.ok) throw new Error('Failed to fetch timer state');
  return res.json();
}

// Stats
export async function fetchTimerStats() {
  const res = await fetch(withBase('/api/timer/stats'));
  if (!res.ok) throw new Error('Failed to fetch timer stats');
  return res.json();
}

// Timer actions: start / pause / reset / switch
export async function postTimerAction(action) {
  const res = await fetch(withBase(`/api/timer/${action}`), {
    method: 'POST'
  });

  if (!res.ok) throw new Error('API call failed');

  const data = await res.json();
  return data; // expected: { success, state, ... }
}
