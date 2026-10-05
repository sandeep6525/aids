import React, { useState } from 'react';
import { api } from '../services/api';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);
    try {
      const response = await api.post('/contact', formData);
      if (response.data.success) {
        setStatusMessage({ type: 'success', text: 'Thank you! Your message has been sent successfully.' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatusMessage({ type: 'error', text: response.data.message || 'Failed to send message.' });
      }
    } catch (error) {
      setStatusMessage({ type: 'error', text: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-bg-main min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-bg-main py-16 md:py-24 border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <p className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-3">Reach Out</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6">Connect With Our Department</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Whether you are a prospective student, a researcher, or an industry partner, we are here to answer your questions and explore collaboration opportunities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Get in Touch Info */}
          <div className="bg-white p-8 md:p-12 border border-border-subtle rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold text-brand-primary mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-bg-main rounded-full flex items-center justify-center border border-brand-accent/30">
                  <MapPin className="text-brand-accent w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-brand-primary mb-1">Department Address</h4>
                  <p className="text-text-secondary leading-relaxed">
                    Department of Artificial Intelligence<br/>
                    Main Engineering Block, 3rd Floor<br/>
                    University Campus, State, PIN 123456
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-bg-main rounded-full flex items-center justify-center border border-brand-accent/30">
                  <Phone className="text-brand-accent w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-brand-primary mb-1">Phone</h4>
                  <p className="text-text-secondary leading-relaxed">+1 234 567 8900</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-bg-main rounded-full flex items-center justify-center border border-brand-accent/30">
                  <Mail className="text-brand-accent w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-brand-primary mb-1">Email</h4>
                  <p className="text-text-secondary leading-relaxed">hod.ai@college.edu</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-bg-main rounded-full flex items-center justify-center border border-brand-accent/30">
                  <Clock className="text-brand-accent w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-brand-primary mb-1">Office Hours</h4>
                  <p className="text-text-secondary leading-relaxed">Monday - Friday<br/>9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Send Message Form */}
          <div className="bg-white p-8 md:p-12 border border-border-subtle rounded-lg shadow-sm">
            <h2 className="text-3xl font-bold text-brand-primary mb-8">Send a Message</h2>
            {statusMessage && (
              <div className={`mb-6 p-4 rounded text-sm font-bold ${statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {statusMessage.text}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-brand-primary mb-2">Your Name *</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-border-subtle rounded focus:ring-2 focus:ring-gold/50 focus:border-brand-accent outline-none" required disabled={isSubmitting} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-primary mb-2">Your Email *</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 border border-border-subtle rounded focus:ring-2 focus:ring-gold/50 focus:border-brand-accent outline-none" required disabled={isSubmitting} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-brand-primary mb-2">Phone (Optional)</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 border border-border-subtle rounded focus:ring-2 focus:ring-gold/50 focus:border-brand-accent outline-none" disabled={isSubmitting} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-primary mb-2">Subject *</label>
                  <input type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 border border-border-subtle rounded focus:ring-2 focus:ring-gold/50 focus:border-brand-accent outline-none" required disabled={isSubmitting} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-primary mb-2">Message *</label>
                <textarea rows="5" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 border border-border-subtle rounded focus:ring-2 focus:ring-gold/50 focus:border-brand-accent outline-none resize-none" required disabled={isSubmitting}></textarea>
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-4 rounded text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white border border-border-subtle rounded-lg shadow-sm p-4 h-96 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-brand-accent mx-auto mb-4" />
            <h3 className="text-xl font-bold text-brand-primary">Map Location</h3>
            <p className="text-text-secondary">Google Maps embed will be configured from admin settings.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
