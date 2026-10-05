import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X, Upload, CheckCircle } from 'lucide-react';

const AnnouncementsManager = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', content: '', category: 'GENERAL',
    attachment_url: '', priority: 'NORMAL',
    is_featured: false, is_published: true, expiry_date: ''
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await api.get('/announcements/admin');
      if (response.data.success) setAnnouncements(response.data.data);
    } catch (error) {
      console.error('Error fetching announcements', error);
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
        setFormData(prev => ({ ...prev, attachment_url: response.data.data.url }));
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
        await api.put(`/announcements/admin/${editingId}`, formData);
      } else {
        await api.post('/announcements/admin', formData);
      }
      setShowModal(false);
      setEditingId(null);
      fetchAnnouncements();
    } catch (error) {
      console.error('Error saving announcement', error);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '', content: '', category: 'GENERAL',
      attachment_url: '', priority: 'NORMAL',
      is_featured: false, is_published: true, expiry_date: ''
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    const formattedDate = item.expiry_date ? new Date(item.expiry_date).toISOString().split('T')[0] : '';
    setFormData({ ...item, expiry_date: formattedDate });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await api.delete(`/announcements/admin/${id}`);
        fetchAnnouncements();
      } catch (error) {
        console.error('Error deleting announcement', error);
      }
    }
  };

  if (loading) return <div className="p-8">Loading announcements...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">Announcements Manager</h2>
        <button onClick={openAddModal} className="bg-brand-accent text-white px-4 py-2 rounded flex items-center hover:bg-brand-accent-light">
          <Plus className="w-4 h-4 mr-2" /> Add Announcement
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-main border-b border-border-subtle">
              <th className="py-3 px-4 font-semibold text-brand-primary">Date</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Title</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Priority</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Status</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((a) => (
              <tr key={a.id} className="border-b border-border-subtle hover:bg-gray-50">
                <td className="py-3 px-4">{new Date(a.created_at).toLocaleDateString()}</td>
                <td className="py-3 px-4 font-medium">{a.title}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${a.priority === 'HIGH' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                    {a.priority}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${a.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {a.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3">
                  <button onClick={() => openEditModal(a)} className="text-brand-primary hover:text-brand-accent"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-border-subtle sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-brand-primary">{editingId ? 'Edit Announcement' : 'Add Announcement'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="block text-sm mb-1">Title</label><input type="text" required value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded" /></div>
                
                <div>
                  <label className="block text-sm mb-1">Category</label>
                  <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border rounded">
                    <option value="GENERAL">General</option>
                    <option value="ACADEMIC">Academic</option>
                    <option value="EXAM">Exam</option>
                    <option value="PLACEMENT">Placement</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
                <div><label className="block text-sm mb-1">Priority</label>
                  <select required value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} className="w-full p-2 border rounded">
                    <option value="NORMAL">Normal</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
                
                <div><label className="block text-sm mb-1">Expiry Date</label><input type="date" value={formData.expiry_date || ''} onChange={e => setFormData({...formData, expiry_date: e.target.value})} className="w-full p-2 border rounded" /></div>
                
                <div className="flex items-center gap-4 mt-6">
                  <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} /> Published</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} /> Featured</label>
                </div>

                <div className="col-span-2"><label className="block text-sm mb-1">Content</label><textarea required value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full p-2 border rounded" rows="4"></textarea></div>
                
                <div className="col-span-2 border-t pt-4">
                  <label className="block text-sm mb-1">Attachment (Optional PDF/Image)</label>
                  <div className="flex gap-2 items-center">
                    <input type="file" onChange={handleFileUpload} className="w-full p-2 border rounded" />
                    {isUploading && <span className="text-gray-500">Uploading...</span>}
                    {formData.attachment_url && <span className="text-green-600"><CheckCircle className="w-5 h-5"/></span>}
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
export default AnnouncementsManager;
