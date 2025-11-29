'use client';

import Link from 'next/link';
import AuthShell from '@/components/auth/AuthShell';
import AuthCard from '@/components/auth/AuthCard';
import { useAuthForm } from '@/hooks/useAuthForm';

export default function RegisterPage() {
  const {
    form,
    isSubmitting,
    error,
    handleChange,
    handleSubmit,
  } = useAuthForm('register');

  return (
    <AuthShell>
      <AuthCard
        title="Create your account"
        subtitle="Sign up to track your focus sessions"
        footer={
          <>
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Sign in
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="text-sm text-red-400 bg-red-950/40 border border-red-700 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wide">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Kasra"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wide">
              Username
            </label>
            <input
              name="username"
              type="text"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="SpaceCowboy"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wide">
              Email
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wide">
              Password
            </label>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-lg bg-blue-500 text-sm font-medium tracking-wide py-2.5 hover:bg-blue-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Creating account…' : 'Sign up'}
          </button>
        </form>
      </AuthCard>
    </AuthShell>
  );
}
