import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X, Upload, CheckCircle } from 'lucide-react';

const FacultyManager = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '', designation: '', qualification: '', experience: 0,
    specialization: '', subjects: '', research_interests: '',
    email: '', linkedin_url: '', orcid_url: '', photo_url: '',
    bio: '', is_active: true, display_order: 0
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await api.get('/faculty/admin');
      if (response.data.success) {
        setFaculty(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching faculty', error);
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
      const response = await api.post('/admin/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        setFormData(prev => ({ ...prev, photo_url: response.data.data.url }));
      }
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
        await api.put(`/faculty/admin/${editingId}`, formData);
      } else {
        await api.post('/faculty/admin', formData);
      }
      setShowModal(false);
      setEditingId(null);
      fetchFaculty();
    } catch (error) {
      console.error('Error saving faculty', error);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '', designation: '', qualification: '', experience: 0,
      specialization: '', subjects: '', research_interests: '',
      email: '', linkedin_url: '', orcid_url: '', photo_url: '',
      bio: '', is_active: true, display_order: 0
    });
    setShowModal(true);
  };

  const openEditModal = (member) => {
    setEditingId(member.id);
    setFormData(member);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      try {
        await api.delete(`/faculty/admin/${id}`);
        fetchFaculty();
      } catch (error) {
        console.error('Error deleting faculty', error);
      }
    }
  };

  if (loading) return <div className="p-8">Loading faculty...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">Faculty Manager</h2>
        <button onClick={openAddModal} className="bg-brand-accent text-white px-4 py-2 rounded flex items-center hover:bg-brand-accent-light">
          <Plus className="w-4 h-4 mr-2" /> Add Faculty
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-main border-b border-border-subtle">
              <th className="py-3 px-4 font-semibold text-brand-primary">Photo</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Name</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Designation</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Order</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Status</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map((f) => (
              <tr key={f.id} className="border-b border-border-subtle hover:bg-gray-50">
                <td className="py-3 px-4">
                  {f.photo_url ? <img src={f.photo_url} alt={f.name} className="h-10 w-10 rounded-full object-cover" /> : <div className="h-10 w-10 rounded-full bg-gray-200"></div>}
                </td>
                <td className="py-3 px-4 font-medium">{f.name}</td>
                <td className="py-3 px-4">{f.designation}</td>
                <td className="py-3 px-4">{f.display_order}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${f.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {f.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3">
                  <button onClick={() => openEditModal(f)} className="text-brand-primary hover:text-brand-accent"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(f.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-border-subtle sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-brand-primary">{editingId ? 'Edit Faculty' : 'Add Faculty'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm mb-1">Name</label><input type="text" required value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Designation</label><input type="text" required value={formData.designation || ''} onChange={e => setFormData({...formData, designation: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Qualification</label><input type="text" value={formData.qualification || ''} onChange={e => setFormData({...formData, qualification: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Experience (Years)</label><input type="number" value={formData.experience || 0} onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Specialization</label><input type="text" value={formData.specialization || ''} onChange={e => setFormData({...formData, specialization: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Email</label><input type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div>
                  <label className="block text-sm mb-1">Display Order</label>
                  <input type="number" min="1" value={formData.display_order || ''} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})} className="w-full p-2 border rounded" />
                  <p className="text-xs text-text-secondary mt-1">Lower numbers appear first (e.g., 1 = first).</p>
                </div>
                <div className="col-span-2"><label className="block text-sm mb-1">Bio</label><textarea value={formData.bio || ''} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full p-2 border rounded" rows="3"></textarea></div>
                
                {/* Photo Upload */}
                <div className="col-span-2 border-t pt-4">
                  <label className="block text-sm mb-1">Photo Upload</label>
                  <div className="flex gap-2 items-center">
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current.click()} disabled={isUploading} className="bg-gray-100 px-4 py-2 rounded flex items-center">
                      <Upload className="w-4 h-4 mr-2" /> {isUploading ? 'Uploading...' : 'Choose Photo'}
                    </button>
                    {formData.photo_url && <span className="text-green-600 text-sm flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> Uploaded</span>}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-border-subtle mt-6">
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
export default FacultyManager;
