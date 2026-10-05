import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Save, CheckCircle } from 'lucide-react';

const DepartmentManager = () => {
  const [settings, setSettings] = useState({
    department_name: '',
    short_name: '',
    department_code: '',
    college_name: '',
    university_name: '',
    department_description: '',
    about_department: '',
    vision: '',
    mission: '',
    objectives: '',
    hod_name: '',
    hod_designation: '',
    hod_message: '',
    department_email: '',
    department_phone: '',
    office_address: '',
    working_hours: '',
    established_year: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/website-settings');
      if (response.data.success) {
        // The API returns key-value pairs in an object format usually
        // Wait, the API returns data where key is the key and value is the value
        const data = response.data.data;
        const newSettings = { ...settings };
        for (const key in newSettings) {
          if (data[key] !== undefined) {
            newSettings[key] = data[key];
          }
        }
        setSettings(newSettings);
      }
    } catch (error) {
      console.error('Error fetching department settings', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      // Assuming PUT /api/website-settings/admin/:key updates the setting
      // But we can batch this using Promises
      const promises = Object.entries(settings).map(([key, value]) => {
        return api.put(`/website-settings/admin/${key}`, { value, description: key.replace(/_/g, ' ') });
      });
      await Promise.all(promises);
      setMessage({ type: 'success', text: 'Department details saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving settings', error);
      setMessage({ type: 'error', text: 'Failed to save settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading department data...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-brand-primary mb-6">Department Details Manager</h2>
      
      {message && (
        <div className={`mb-6 p-4 rounded text-sm font-bold flex items-center gap-2 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.type === 'success' && <CheckCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Basic Info */}
        <div>
          <h3 className="text-lg font-bold text-brand-primary mb-4 border-b border-border-subtle pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Department Name</label>
              <input type="text" value={settings.department_name} onChange={e => setSettings({...settings, department_name: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Short Name</label>
              <input type="text" value={settings.short_name} onChange={e => setSettings({...settings, short_name: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Department Code</label>
              <input type="text" value={settings.department_code} onChange={e => setSettings({...settings, department_code: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Established Year</label>
              <input type="text" value={settings.established_year} onChange={e => setSettings({...settings, established_year: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">College Name</label>
              <input type="text" value={settings.college_name} onChange={e => setSettings({...settings, college_name: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">University Name</label>
              <input type="text" value={settings.university_name} onChange={e => setSettings({...settings, university_name: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-lg font-bold text-brand-primary mb-4 border-b border-border-subtle pb-2">Department Content</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Short Description (for Homepage)</label>
              <textarea rows="3" value={settings.department_description} onChange={e => setSettings({...settings, department_description: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">About Department (Full text)</label>
              <textarea rows="5" value={settings.about_department} onChange={e => setSettings({...settings, about_department: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Vision</label>
              <textarea rows="3" value={settings.vision} onChange={e => setSettings({...settings, vision: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Mission</label>
              <textarea rows="3" value={settings.mission} onChange={e => setSettings({...settings, mission: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none"></textarea>
            </div>
          </div>
        </div>

        {/* HOD Info */}
        <div>
          <h3 className="text-lg font-bold text-brand-primary mb-4 border-b border-border-subtle pb-2">Head of Department (HOD)</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">HOD Name</label>
                <input type="text" value={settings.hod_name} onChange={e => setSettings({...settings, hod_name: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">HOD Designation</label>
                <input type="text" value={settings.hod_designation} onChange={e => setSettings({...settings, hod_designation: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">HOD Message</label>
              <textarea rows="4" value={settings.hod_message} onChange={e => setSettings({...settings, hod_message: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none"></textarea>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-brand-primary mb-4 border-b border-border-subtle pb-2">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Department Email</label>
              <input type="email" value={settings.department_email} onChange={e => setSettings({...settings, department_email: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Department Phone</label>
              <input type="text" value={settings.department_phone} onChange={e => setSettings({...settings, department_phone: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Office Address</label>
              <input type="text" value={settings.office_address} onChange={e => setSettings({...settings, office_address: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Working Hours</label>
              <input type="text" value={settings.working_hours} onChange={e => setSettings({...settings, working_hours: e.target.value})} className="w-full p-2 border rounded focus:ring-2 focus:ring-gold outline-none" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border-subtle flex justify-end">
          <button type="submit" disabled={saving} className="bg-brand-accent hover:bg-brand-accent-light text-white px-8 py-3 rounded font-bold transition-colors disabled:opacity-50 flex items-center gap-2">
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Department Details'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentManager;
