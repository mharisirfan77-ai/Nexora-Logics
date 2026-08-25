import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Mail, MapPin, Clock, Send } from 'lucide-react';

export const Contact = () => {
  const { data, addInquiry } = useCMS();
  const { siteInfo, sectionsConfig } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    message: ''
  });

  if (!sectionsConfig.contact?.enabled) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill in your name and email address.');
      return;
    }
    addInquiry(formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Web Development',
      message: ''
    });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-padding">
        <div className="section-header centered-header">
          <div className="section-label">Get In Touch</div>
          <h2 className="section-title">Get a free quote</h2>
          <p className="section-sub">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-item-icon">
                <Mail size={22} />
              </div>
              <div>
                <h4>Email</h4>
                <span>{siteInfo.email}</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <MapPin size={22} />
              </div>
              <div>
                <h4>Location</h4>
                <span>{siteInfo.location}</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <Clock size={22} />
              </div>
              <div>
                <h4>Response Time</h4>
                <span>{siteInfo.responseTime}</span>
              </div>
            </div>

            <p className="contact-note">
              Whether you need an eBook, a website, a stronger social presence, or ad campaigns that convert — we're ready to help you grow.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Your Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="eBook Creation & Publishing">eBook Creation & Publishing</option>
                <option value="Web Development">Web Development</option>
                <option value="Social Media Marketing">Social Media Marketing</option>
                <option value="Paid Advertising">Paid Advertising</option>
                <option value="Multiple Services">Multiple Services</option>
              </select>
            </div>
            <textarea
              placeholder="Tell us about your project..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
            <button type="submit" className="form-submit">
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
