import React from 'react';
import { PageHeader } from '../components/public/PageHeader';
import { About } from '../components/public/About';
import { StatsBar } from '../components/public/StatsBar';
import { WhyUs } from '../components/public/WhyUs';
import { Testimonials } from '../components/public/Testimonials';
import { useCMS } from '../context/CMSContext';

export const AboutPage = () => {
  const { data } = useCMS();
  const { about } = data;

  return (
    <>
      <PageHeader
        title={about.title || "About Nexora Logics"}
        subtitle={about.subtitle || "Learn about our vision, values, and how we deliver connected digital growth."}
        categoryLabel="Our Agency Story"
      />
      <About />
      <StatsBar />
      <WhyUs />
      <Testimonials />
    </>
  );
};
