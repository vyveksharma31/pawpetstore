import React from 'react';
import HeroSection from '../components/home/HeroSection';
import PetCategories from '../components/home/PetCategories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BreedShowcase from '../components/home/BreedShowcase';
import ClinicBanner from '../components/home/ClinicBanner';
import TrustBadges from '../components/home/TrustBadges';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <PetCategories />
      <FeaturedProducts />
      <BreedShowcase />
      <ClinicBanner />
      <TrustBadges />
    </div>
  );
}
