import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, LogIn, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = (type) => {
    if (type === 'customer') {
      setEmail('demo@pawpetstore.com');
      setPassword('Demo@123');
    } else {
      setEmail('admin@pawpetstore.com');
      setPassword('Admin@123');
    }
    setError('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-black">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-950 p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-zinc-800 shadow-soft">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 mx-auto flex items-center justify-center text-2xl shadow-xs">
            🐾
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome Back Pet Parent!
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Sign in to track orders, manage vet appointments, and reorder pet favorites.
          </p>
        </div>

        {/* Demo Credentials Quick-Fill helper */}
        <div className="bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200/80 dark:border-brand-900/60 p-3.5 rounded-2xl space-y-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-brand-900 dark:text-brand-300">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>Quick Demo Credentials (One-Click Fill)</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo('customer')}
              className="flex-1 bg-white dark:bg-zinc-900 hover:bg-brand-100/60 dark:hover:bg-zinc-800 border border-brand-200 dark:border-brand-900/50 text-brand-800 dark:text-brand-300 font-semibold py-1.5 px-2.5 rounded-xl transition-colors"
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('admin')}
              className="flex-1 bg-white dark:bg-zinc-900 hover:bg-brand-100/60 dark:hover:bg-zinc-800 border border-brand-200 dark:border-brand-900/50 text-brand-800 dark:text-brand-300 font-semibold py-1.5 px-2.5 rounded-xl transition-colors"
            >
              Admin Portal
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-xs p-3.5 rounded-2xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            isLoading={isLoading}
            size="lg"
            className="w-full gap-2 shadow-lg shadow-brand-500/20"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Account</span>
          </Button>
        </form>

        {/* Footer Link to Register */}
        <div className="text-center pt-2 border-t border-slate-100 dark:border-zinc-800">
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-brand-600 hover:text-brand-700">
              Create an account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
