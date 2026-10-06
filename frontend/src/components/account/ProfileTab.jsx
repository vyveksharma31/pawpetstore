import React, { useState } from 'react';
import { User, Phone, Mail, Shield, Check, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import Button from '../common/Button';
import Input from '../common/Input';

export default function ProfileTab({ user, onUserUpdated }) {
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFeedback({ type: '', text: '' });

      const res = await api.put('/auth/profile', { name, phone });
      if (res.success && res.data) {
        setFeedback({ type: 'success', text: 'Profile updated successfully!' });
        if (onUserUpdated) onUserUpdated(res.data.user);
      }
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Failed to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 dark:border-zinc-800 pb-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Profile Overview</h3>
        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
          Manage your personal details and contact information.
        </p>
      </div>

      {feedback.text && (
        <div
          className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
          }`}
        >
          {feedback.type === 'success' ? <Check className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Account Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 dark:bg-zinc-900/60 rounded-2xl border border-slate-100 dark:border-zinc-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-wider block font-bold">Account Email</span>
            <strong className="text-xs text-slate-900 dark:text-white">{user?.email}</strong>
          </div>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-zinc-900/60 rounded-2xl border border-slate-100 dark:border-zinc-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-wider block font-bold">Permissions Role</span>
            <strong className="text-xs text-slate-900 dark:text-white capitalize">{user?.role || 'Customer'}</strong>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your Name"
          />

          <Input
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 9876543210"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" size="sm" loading={loading} className="rounded-full">
            Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
