import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import PaymentHub from '../components/PaymentHub';
import CommunityPortal from '../components/CommunityPortal';
import FAQ from '../components/FAQ';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Services />
      <PaymentHub />
      <CommunityPortal />
      <FAQ />
    </>
  );
};

export default LandingPage;
