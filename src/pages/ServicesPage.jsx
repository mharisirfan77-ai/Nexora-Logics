import React from 'react';
import { PageHeader } from '../components/public/PageHeader';
import { Services } from '../components/public/Services';
import { Process } from '../components/public/Process';
import { Contact } from '../components/public/Contact';
import { useCMS } from '../context/CMSContext';

export const ServicesPage = () => {
  const { data } = useCMS();
  const { servicesHeader } = data;

  return (
    <>
      <PageHeader
        title={servicesHeader?.title || "Our Comprehensive Digital Services"}
        subtitle={servicesHeader?.subtitle || "eBooks, Web Development, Social Media, and Paid Advertising tailored to scale your brand."}
        categoryLabel="Core Capabilities"
      />
      <Services />
      <Process />
      <Contact />
    </>
  );
};
