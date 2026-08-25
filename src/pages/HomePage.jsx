import React from 'react';
import { Hero } from '../components/public/Hero';
import { AgencyReel } from '../components/public/AgencyReel';
import { StatsBar } from '../components/public/StatsBar';
import { About } from '../components/public/About';
import { Services } from '../components/public/Services';
import { Portfolio } from '../components/public/Portfolio';
import { TeamShowcase } from '../components/public/TeamShowcase';
import { Process } from '../components/public/Process';
import { WhyUs } from '../components/public/WhyUs';
import { Testimonials } from '../components/public/Testimonials';
import { Contact } from '../components/public/Contact';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <AgencyReel />
      <StatsBar />
      <About />
      <Services />
      <Portfolio />
      <TeamShowcase />
      <Process />
      <WhyUs />
      <Testimonials />
      <Contact />
    </>
  );
};
