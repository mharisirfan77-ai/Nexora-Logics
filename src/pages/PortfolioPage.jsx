import React from 'react';
import { PageHeader } from '../components/public/PageHeader';
import { Portfolio } from '../components/public/Portfolio';
import { Testimonials } from '../components/public/Testimonials';
import { Contact } from '../components/public/Contact';
import { useCMS } from '../context/CMSContext';

export const PortfolioPage = () => {
  const { data } = useCMS();
  const { portfolioHeader } = data;

  return (
    <>
      <PageHeader
        title={portfolioHeader?.title || "Creative Agency Portfolio"}
        subtitle={portfolioHeader?.subtitle || "Explore our case studies and digital deliverables designed for authority and growth."}
        categoryLabel="Client Works"
      />
      <Portfolio />
      <Testimonials />
      <Contact />
    </>
  );
};
