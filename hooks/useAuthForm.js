'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser } from '@/lib/api/auth/authClient';

export function useAuthForm(mode = 'login') {
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    name: '',        // only used on register
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const isLogin = mode === 'login';

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password,
      };
      if (!isLogin) {
        payload.name = form.name;
      }
      // Both login and register now send username, email, and password

      const data = isLogin
        ? await loginUser(payload)
        : await registerUser(payload);

      // OPTIONAL: store tokens if backend sends them
      // Adjust these keys based on your real response:
      if (typeof window !== 'undefined') {
        if (data.accessToken) {
          window.localStorage.setItem('accessToken', data.accessToken);
        }
        if (data.refreshToken) {
          window.localStorage.setItem('refreshToken', data.refreshToken);
        }
      }

      // After successful login/register -> go to timer homepage
      router.push('/');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    isSubmitting,
    error,
    isLogin,
    handleChange,
    handleSubmit,
  };
}
