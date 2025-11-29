const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

function withBase(path) {
  return `${API_BASE_URL}${path}`;
}

// Adjust these paths if your backend is slightly different
const REGISTER_ENDPOINT = '/api/auth/register';
const LOGIN_ENDPOINT = '/api/auth/login';  // <- change if needed
const LOGOUT_ENDPOINT = '/api/auth/logout';
const REFRESH_ENDPOINT = '/api/auth/refresh';

async function handleJson(res) {
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data?.message || data?.error || 'Request failed';
    throw new Error(message);
  }
  return data;
}

export async function registerUser(payload) {
  const res = await fetch(withBase(REGISTER_ENDPOINT), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleJson(res);
}

export async function loginUser(payload) {
  const res = await fetch(withBase(LOGIN_ENDPOINT), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleJson(res);
}

export async function logoutUser() {
  const res = await fetch(withBase(LOGOUT_ENDPOINT), {
    method: 'POST',
    credentials: 'include', // if your backend uses cookies
  });
  return handleJson(res);
}

export async function refreshToken() {
  const res = await fetch(withBase(REFRESH_ENDPOINT), {
    method: 'POST',
    credentials: 'include',
  });
  return handleJson(res);
}
