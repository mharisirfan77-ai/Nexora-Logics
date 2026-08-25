import React from 'react';
import { PageHeader } from '../components/public/PageHeader';
import { WhyUs } from '../components/public/WhyUs';
import { StatsBar } from '../components/public/StatsBar';
import { Testimonials } from '../components/public/Testimonials';
import { Contact } from '../components/public/Contact';
import { useCMS } from '../context/CMSContext';

export const WhyUsPage = () => {
  const { data } = useCMS();
  const { whyUsHeader } = data;

  return (
    <>
      <PageHeader
        title={whyUsHeader?.title || "Why Partner With Nexora Logics"}
        subtitle={whyUsHeader?.subtitle || "Specialized expertise, transparent communication, fast turnaround times, and long-term support."}
        categoryLabel="Our Advantages"
      />
      <WhyUs />
      <StatsBar />
      <Testimonials />
      <Contact />
    </>
  );
};
