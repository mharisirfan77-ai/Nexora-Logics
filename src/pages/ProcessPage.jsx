import React from 'react';
import { PageHeader } from '../components/public/PageHeader';
import { Process } from '../components/public/Process';
import { WhyUs } from '../components/public/WhyUs';
import { Contact } from '../components/public/Contact';
import { useCMS } from '../context/CMSContext';

export const ProcessPage = () => {
  const { data } = useCMS();
  const { processHeader } = data;

  return (
    <>
      <PageHeader
        title={processHeader?.title || "Our Proven 5-Step Execution Process"}
        subtitle={processHeader?.subtitle || "Transparent, predictable timelines from initial strategy discovery to ongoing post-launch support."}
        categoryLabel="Methodology"
      />
      <Process />
      <WhyUs />
      <Contact />
    </>
  );
};
