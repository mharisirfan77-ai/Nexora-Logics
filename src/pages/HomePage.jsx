import React from 'react';
import { Hero } from '../components/public/Hero';
import { StatsBar } from '../components/public/StatsBar';
import { About } from '../components/public/About';
import { Services } from '../components/public/Services';
import { Portfolio } from '../components/public/Portfolio';
import { Process } from '../components/public/Process';
import { WhyUs } from '../components/public/WhyUs';
import { Testimonials } from '../components/public/Testimonials';
import { Contact } from '../components/public/Contact';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <StatsBar />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <WhyUs />
      <Testimonials />
      <Contact />
    </>
  );
};
