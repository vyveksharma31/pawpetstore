import React, { useState } from 'react';
import { MapPin, Plus, Trash2, CheckCircle2, Home, Building2, Edit2, X } from 'lucide-react';
import { api } from '../../services/api';
import Button from '../common/Button';
import Input from '../common/Input';

export default function AddressesTab({ user, onUserUpdated }) {
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: addresses.length === 0,
  });

  const resetForm = () => {
    setFormData({
      fullName: user?.name || '',
      phone: user?.phone || '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false,
    });
    setIsAdding(false);
    setEditingId(null);
    setError('');
  };

  const handleStartEdit = (addr, idx) => {
    setEditingId(addr._id || addr.id || idx);
    setFormData({
      fullName: addr.fullName || '',
      phone: addr.phone || '',
      street: addr.street || '',
      city: addr.city || '',
      state: addr.state || '',
      pincode: addr.pincode || '',
      isDefault: Boolean(addr.isDefault),
    });
    setIsAdding(true);
  };

  const saveAddressesToBackend = async (newList) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.put('/auth/profile', { addresses: newList });
      if (res.success && res.data) {
        setAddresses(newList);
        if (onUserUpdated) onUserUpdated(res.data.user);
        resetForm();
      }
    } catch (err) {
      setError(err.message || 'Failed to save address.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.street || !formData.city || !formData.pincode) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    let updatedList = [...addresses];

    if (editingId !== null) {
      // Update existing
      updatedList = updatedList.map((addr, idx) => {
        const idMatch = (addr._id || addr.id || idx) === editingId;
        if (idMatch) {
          return {
            ...addr,
            ...formData,
            isDefault: formData.isDefault,
          };
        }
        return formData.isDefault ? { ...addr, isDefault: false } : addr;
      });
    } else {
      // Add new
      const newAddr = {
        _id: 'addr-' + Date.now(),
        ...formData,
      };

      if (formData.isDefault) {
        updatedList = updatedList.map((a) => ({ ...a, isDefault: false }));
      }
      updatedList.push(newAddr);
    }

    // Ensure at least one default if list not empty
    if (updatedList.length > 0 && !updatedList.some((a) => a.isDefault)) {
      updatedList[0].isDefault = true;
    }

    saveAddressesToBackend(updatedList);
  };

  const handleDelete = (targetIdx) => {
    const updatedList = addresses.filter((_, idx) => idx !== targetIdx);
    if (updatedList.length > 0 && !updatedList.some((a) => a.isDefault)) {
      updatedList[0].isDefault = true;
    }
    saveAddressesToBackend(updatedList);
  };

  const handleSetDefault = (targetIdx) => {
    const updatedList = addresses.map((addr, idx) => ({
      ...addr,
      isDefault: idx === targetIdx,
    }));
    saveAddressesToBackend(updatedList);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-zinc-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Saved Delivery Addresses</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
            Manage your doorstep shipping locations for fast, 1-click checkout.
          </p>
        </div>

        {!isAdding && (
          <Button
            size="sm"
            onClick={() => {
              resetForm();
              setIsAdding(true);
            }}
            className="rounded-full gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Address</span>
          </Button>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs rounded-xl">
          {error}
        </div>
      )}

      {/* Add / Edit Form */}
      {isAdding && (
        <div className="p-6 bg-slate-50 dark:bg-zinc-900/60 rounded-3xl border border-brand-200 dark:border-brand-900/40 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'Edit Address' : 'Add New Delivery Address'}
            </h4>
            <button
              onClick={resetForm}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-300 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Full Name (Receiver)"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                placeholder="Receiver's Name"
              />
              <Input
                label="Contact Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                placeholder="+91 9876543210"
              />
            </div>

            <Input
              label="Flat / House No. / Street Address"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              required
              placeholder="Apartment 4B, Green Valley Residency"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input
                label="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
                placeholder="Bengaluru"
              />
              <Input
                label="State"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                required
                placeholder="Karnataka"
              />
              <Input
                label="PIN Code"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                required
                placeholder="560001"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="defaultAddr"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                className="w-4 h-4 rounded text-brand-600 border-slate-300 focus:ring-brand-500"
              />
              <label htmlFor="defaultAddr" className="text-xs text-slate-700 dark:text-zinc-300 select-none cursor-pointer">
                Set as default shipping address
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={resetForm} className="rounded-full">
                Cancel
              </Button>
              <Button type="submit" size="sm" loading={loading} className="rounded-full">
                {editingId ? 'Save Address' : 'Add Address'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Addresses List */}
      {addresses.length === 0 && !isAdding ? (
        <div className="bg-slate-50 dark:bg-zinc-900/40 rounded-3xl p-12 text-center border border-slate-100 dark:border-zinc-800 space-y-3">
          <MapPin className="w-12 h-12 text-slate-300 dark:text-zinc-700 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800 dark:text-zinc-200">No Saved Addresses</h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
            Save your home or work delivery address for swift, friction-free checkout on future orders.
          </p>
          <div className="pt-2">
            <Button
              size="sm"
              onClick={() => {
                resetForm();
                setIsAdding(true);
              }}
              className="rounded-full"
            >
              Add Your First Address
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr, idx) => (
            <div
              key={addr._id || addr.id || idx}
              className={`rounded-3xl p-5 border transition-all flex flex-col justify-between ${
                addr.isDefault
                  ? 'bg-brand-50/30 dark:bg-brand-950/20 border-brand-200 dark:border-brand-900/60 shadow-xs'
                  : 'bg-white dark:bg-zinc-950 border-slate-200/80 dark:border-zinc-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Home className="w-4 h-4 text-brand-500" />
                    {addr.fullName}
                  </span>

                  {addr.isDefault && (
                    <span className="bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Default
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600 dark:text-zinc-400 space-y-1">
                  <p>{addr.street}</p>
                  <p>
                    {addr.city}, {addr.state} - <strong className="text-slate-800 dark:text-zinc-200">{addr.pincode}</strong>
                  </p>
                  <p className="text-slate-500 dark:text-zinc-500 pt-1">Phone: {addr.phone}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                {!addr.isDefault ? (
                  <button
                    onClick={() => handleSetDefault(idx)}
                    className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
                  >
                    Set as Default
                  </button>
                ) : (
                  <span className="text-slate-400 text-[11px]">Primary delivery</span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(addr, idx)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
                    title="Edit address"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Delete address"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
