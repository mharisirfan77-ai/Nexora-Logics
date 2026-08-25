import React from 'react';
import { PageHeader } from '../components/public/PageHeader';
import { Contact } from '../components/public/Contact';
import { Testimonials } from '../components/public/Testimonials';
import { useCMS } from '../context/CMSContext';

export const ContactPage = () => {
  const { data } = useCMS();
  const { contactHeader } = data;

  return (
    <>
      <PageHeader
        title={contactHeader?.title || "Get In Touch & Request a Quote"}
        subtitle={contactHeader?.subtitle || "Tell us about your project requirements and get a detailed proposal within 24 hours."}
        categoryLabel="Contact Agency"
      />
      <Contact />
      <Testimonials />
    </>
  );
};
