import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const Footer = () => {
  const [settings, setSettings] = useState({
    college_name: '',
    department_name: 'Department of Artificial Intelligence',
    contact_email: 'hod.ai@college.edu',
    footer_text: 'All rights reserved.',
    social_facebook: '',
    social_twitter: '',
    social_linkedin: '',
    social_instagram: '',
    social_youtube: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/website-settings');
        if (response.data.success) {
          const data = response.data.data;
          setSettings(prev => ({
            ...prev,
            college_name: data.college_name || prev.college_name,
            department_name: data.department_name || prev.department_name,
            contact_email: data.contact_email || prev.contact_email,
            footer_text: data.footer_text || prev.footer_text,
            social_facebook: data.social_facebook || '',
            social_twitter: data.social_twitter || '',
            social_linkedin: data.social_linkedin || '',
            social_instagram: data.social_instagram || '',
            social_youtube: data.social_youtube || ''
          }));
        }
      } catch (error) {
        console.error('Failed to load settings in footer', error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-dark-footer text-white pt-16 pb-8 border-t border-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Dept Info */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-brand-primary font-bold text-xl shadow-sm">AI</div>
              <div>
                <h2 className="text-lg font-bold leading-tight">{settings.department_name}</h2>
                {settings.college_name && <p className="text-xs text-gray-400">{settings.college_name}</p>}
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Building future-ready professionals through quality education, research, innovation and real-world applications.
            </p>
            <div className="flex space-x-4">
              {settings.social_facebook && (
                <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center text-gray-300 hover:text-brand-accent transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                </a>
              )}
              {settings.social_twitter && (
                <a href={settings.social_twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center text-gray-300 hover:text-brand-accent transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
              )}
              {settings.social_linkedin && (
                <a href={settings.social_linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center text-gray-300 hover:text-brand-accent transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              )}
              {settings.social_instagram && (
                <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center text-gray-300 hover:text-brand-accent transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {settings.social_youtube && (
                <a href={settings.social_youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-brand-secondary flex items-center justify-center text-gray-300 hover:text-brand-accent transition-colors">
                  <span className="sr-only">YouTube</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-navy-light pb-2 inline-block text-gray-200">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-brand-accent transition-colors text-sm">About Department</Link></li>
              <li><Link to="/faculty" className="text-gray-300 hover:text-brand-accent transition-colors text-sm">Faculty Directory</Link></li>
              <li><Link to="/academics" className="text-gray-300 hover:text-brand-accent transition-colors text-sm">Academics</Link></li>
              <li><Link to="/events" className="text-gray-300 hover:text-brand-accent transition-colors text-sm">Events</Link></li>
              <li><Link to="/achievements" className="text-gray-300 hover:text-brand-accent transition-colors text-sm">Achievements</Link></li>
              <li><Link to="/placements" className="text-gray-300 hover:text-brand-accent transition-colors text-sm">Placements</Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-brand-accent transition-colors text-sm">Projects</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-brand-accent transition-colors text-sm">Gallery</Link></li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-navy-light pb-2 inline-block text-gray-200">Important Links</h3>
            <ul className="space-y-3">
              <li><Link to="/downloads" className="text-gray-300 hover:text-brand-accent transition-colors text-sm">Downloads</Link></li>
              <li><Link to="/alumni" className="text-gray-300 hover:text-brand-accent transition-colors text-sm">Alumni</Link></li>
              <li><Link to="/research" className="text-gray-300 hover:text-brand-accent transition-colors text-sm">Research</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-brand-accent transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-navy-light pb-2 inline-block text-gray-200">Contact Us</h3>
            <address className="not-italic text-sm text-gray-400 space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <p>{settings.department_name}<br/>Main Engineering Block<br/>University Campus</p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <svg className="w-5 h-5 text-brand-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <a href={`mailto:${settings.contact_email}`} className="hover:text-brand-accent transition-colors">{settings.contact_email}</a>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-navy-light pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {settings.department_name}. {settings.footer_text}
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
