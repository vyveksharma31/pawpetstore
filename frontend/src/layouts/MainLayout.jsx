import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import MobileNav from '../components/layout/MobileNav';
import Footer from '../components/layout/Footer';
import LocationModal from '../components/common/LocationModal';
import CartDrawer from '../components/cart/CartDrawer';

export default function MainLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-black text-slate-800 dark:text-zinc-100 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar onOpenMobileNav={() => setMobileNavOpen(true)} />

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Modals & Slide-overs */}
      <LocationModal />
      <CartDrawer />

      {/* Main Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
