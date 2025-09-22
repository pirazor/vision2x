import React from 'react';
import Hero from '../components/Home/Hero';
import ProductShowcase from '../components/Home/ProductShowcase';
import TechnologyStack from '../components/Home/TechnologyStack';
import IndustryPartners from '../components/Home/IndustryPartners';
import ResourcesPreview from '../components/Home/ResourcesPreview';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductShowcase />
      <TechnologyStack />
      <IndustryPartners />
      <ResourcesPreview />
    </div>
  );
};

export default HomePage;