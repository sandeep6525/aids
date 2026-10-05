import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X, Upload, CheckCircle } from 'lucide-react';

const AlumniManager = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', graduation_year: new Date().getFullYear() - 1, programme: 'B.Tech AI & DS',
    company: '', designation: '', location: '', profile_photo_url: '', linkedin_url: '',
    bio: '', is_featured: false, is_published: true
  });

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const response = await api.get('/alumni/admin');
      if (response.data.success) setAlumni(response.data.data);
    } catch (error) {
      console.error('Error fetching alumni', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);
    try {
      const response = await api.post('/admin/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (response.data.success) setFormData(prev => ({ ...prev, profile_photo_url: response.data.data.url }));
    } catch (error) {
      alert('Upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/alumni/admin/${editingId}`, formData);
      } else {
        await api.post('/alumni/admin', formData);
      }
      setShowModal(false);
      fetchAlumni();
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData(item);
    } else {
      setEditingId(null);
      setFormData({
        name: '', graduation_year: new Date().getFullYear() - 1, programme: 'B.Tech AI & DS',
        company: '', designation: '', location: '', profile_photo_url: '', linkedin_url: '',
        bio: '', is_featured: false, is_published: true
      });
    }
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this alumni record?')) {
      await api.delete(`/alumni/admin/${id}`);
      fetchAlumni();
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">Alumni Network Manager</h2>
        <button onClick={() => openModal()} className="bg-brand-accent text-white px-4 py-2 rounded flex items-center hover:bg-brand-accent-light">
          <Plus className="w-4 h-4 mr-2" /> Add Alumni
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-main border-b border-border-subtle">
              <th className="py-3 px-4 font-semibold text-brand-primary">Name</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Batch</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Current Role</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Location</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Status</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alumni.map((a) => (
              <tr key={a.id} className="border-b border-border-subtle hover:bg-gray-50">
                <td className="py-3 px-4 font-bold">
                  <div className="flex items-center gap-3">
                    <img src={a.profile_photo_url || 'https://via.placeholder.com/50'} className="w-8 h-8 rounded-full object-cover" />
                    {a.name}
                  </div>
                </td>
                <td className="py-3 px-4">{a.graduation_year}</td>
                <td className="py-3 px-4 text-sm">{a.designation} <br/> <span className="text-gray-500">{a.company}</span></td>
                <td className="py-3 px-4">{a.location}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${a.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {a.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3">
                  <button onClick={() => openModal(a)} className="text-brand-primary hover:text-brand-accent"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Alumni' : 'Add Alumni'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm mb-1">Name</label><input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Graduation Year</label><input type="number" required value={formData.graduation_year} onChange={e => setFormData({...formData, graduation_year: e.target.value})} className="w-full p-2 border rounded" /></div>
                
                <div><label className="block text-sm mb-1">Programme</label><input type="text" value={formData.programme} onChange={e => setFormData({...formData, programme: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Location</label><input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-2 border rounded" /></div>
                
                <div><label className="block text-sm mb-1">Company</label><input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Designation</label><input type="text" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} className="w-full p-2 border rounded" /></div>
                
                <div className="col-span-2"><label className="block text-sm mb-1">LinkedIn URL</label><input type="url" value={formData.linkedin_url} onChange={e => setFormData({...formData, linkedin_url: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div className="col-span-2"><label className="block text-sm mb-1">Bio</label><textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full p-2 border rounded" rows="3"></textarea></div>

                <div className="col-span-2 border-t pt-4">
                  <label className="block text-sm mb-1">Profile Photo</label>
                  <input type="file" onChange={handleFileUpload} className="text-sm" />
                  {isUploading && <span className="text-gray-500 text-sm ml-2">Uploading...</span>}
                  {formData.profile_photo_url && <span className="text-green-600 text-sm ml-2 font-bold">Attached</span>}
                </div>
                
                <div className="col-span-2 flex items-center gap-4 mt-4">
                  <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} /> Published</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} /> Featured</label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-gray-600">Cancel</button>
                <button type="submit" disabled={isUploading} className="px-4 py-2 bg-brand-accent text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AlumniManager;
