import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Save } from 'lucide-react';

const SettingsManager = () => {
  const [settings, setSettings] = useState({
    collegeName: '',
    departmentName: '',
    contactEmail: '',
    footerText: '',
    social_linkedin: '',
    social_twitter: '',
    social_facebook: '',
    social_instagram: '',
    social_youtube: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/website-settings');
      if (response.data.success) {
        const data = response.data.data;
        setSettings({
          collegeName: data.college_name || '',
          departmentName: data.department_name || '',
          contactEmail: data.contact_email || '',
          footerText: data.footer_text || '',
          social_linkedin: data.social_linkedin || '',
          social_twitter: data.social_twitter || '',
          social_facebook: data.social_facebook || '',
          social_instagram: data.social_instagram || '',
          social_youtube: data.social_youtube || ''
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      const promises = [
        api.put('/website-settings/admin/college_name', { value: settings.collegeName, description: 'Main College Name' }),
        api.put('/website-settings/admin/department_name', { value: settings.departmentName, description: 'Department Name' }),
        api.put('/website-settings/admin/contact_email', { value: settings.contactEmail, description: 'Primary Contact Email' }),
        api.put('/website-settings/admin/footer_text', { value: settings.footerText, description: 'Footer Copyright Text' }),
        api.put('/website-settings/admin/social_linkedin', { value: settings.social_linkedin, description: 'LinkedIn URL' }),
        api.put('/website-settings/admin/social_twitter', { value: settings.social_twitter, description: 'Twitter/X URL' }),
        api.put('/website-settings/admin/social_facebook', { value: settings.social_facebook, description: 'Facebook URL' }),
        api.put('/website-settings/admin/social_instagram', { value: settings.social_instagram, description: 'Instagram URL' }),
        api.put('/website-settings/admin/social_youtube', { value: settings.social_youtube, description: 'YouTube URL' })
      ];
      await Promise.all(promises);
      
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Error saving settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading settings...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6 max-w-4xl">
      <h2 className="text-2xl font-bold text-brand-primary mb-6">Website Settings</h2>
      
      {message && (
        <div className={`p-4 mb-6 rounded font-semibold ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* General Settings */}
        <div>
          <h3 className="text-lg font-bold text-brand-primary mb-4 border-b border-border-subtle pb-2">General</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">College Name</label>
              <input type="text" value={settings.collegeName} onChange={(e) => setSettings({...settings, collegeName: e.target.value})} className="w-full px-4 py-2 border border-border-subtle rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
              <input type="text" value={settings.departmentName} onChange={(e) => setSettings({...settings, departmentName: e.target.value})} className="w-full px-4 py-2 border border-border-subtle rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input type="email" value={settings.contactEmail} onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} className="w-full px-4 py-2 border border-border-subtle rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Footer Text</label>
              <input type="text" value={settings.footerText} onChange={(e) => setSettings({...settings, footerText: e.target.value})} className="w-full px-4 py-2 border border-border-subtle rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold text-brand-primary mb-4 border-b border-border-subtle pb-2">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input type="url" placeholder="https://linkedin.com/..." value={settings.social_linkedin} onChange={(e) => setSettings({...settings, social_linkedin: e.target.value})} className="w-full px-4 py-2 border border-border-subtle rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X URL</label>
              <input type="url" placeholder="https://twitter.com/..." value={settings.social_twitter} onChange={(e) => setSettings({...settings, social_twitter: e.target.value})} className="w-full px-4 py-2 border border-border-subtle rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input type="url" placeholder="https://facebook.com/..." value={settings.social_facebook} onChange={(e) => setSettings({...settings, social_facebook: e.target.value})} className="w-full px-4 py-2 border border-border-subtle rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input type="url" placeholder="https://instagram.com/..." value={settings.social_instagram} onChange={(e) => setSettings({...settings, social_instagram: e.target.value})} className="w-full px-4 py-2 border border-border-subtle rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
              <input type="url" placeholder="https://youtube.com/..." value={settings.social_youtube} onChange={(e) => setSettings({...settings, social_youtube: e.target.value})} className="w-full px-4 py-2 border border-border-subtle rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving} className="flex items-center bg-brand-accent text-white px-8 py-3 font-bold rounded hover:bg-brand-accent-light disabled:opacity-50">
          <Save className="w-5 h-5 mr-2" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default SettingsManager;
