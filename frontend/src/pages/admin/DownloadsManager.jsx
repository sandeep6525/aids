import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react';

const DownloadsManager = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', description: '', file_url: '', category: 'ACADEMIC', is_published: true
  });

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      const response = await api.get('/downloads/admin');
      if (response.data.success) setDownloads(response.data.data);
    } catch (error) {
      console.error(error);
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
      if (response.data.success) setFormData(prev => ({ ...prev, file_url: response.data.data.url }));
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
        await api.put(`/downloads/admin/${editingId}`, formData);
      } else {
        await api.post('/downloads/admin', formData);
      }
      setShowModal(false);
      fetchDownloads();
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
      setFormData({ title: '', description: '', file_url: '', category: 'ACADEMIC', is_published: true });
    }
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this download file?')) {
      await api.delete(`/downloads/admin/${id}`);
      fetchDownloads();
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">Downloads Manager</h2>
        <button onClick={() => openModal()} className="bg-brand-accent text-white px-4 py-2 rounded flex items-center hover:bg-brand-accent-light">
          <Plus className="w-4 h-4 mr-2" /> Add Resource
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-main border-b border-border-subtle">
              <th className="py-3 px-4 font-semibold text-brand-primary">Title</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Category</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Downloads</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Status</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {downloads.map((d) => (
              <tr key={d.id} className="border-b border-border-subtle hover:bg-gray-50">
                <td className="py-3 px-4 font-bold">{d.title}</td>
                <td className="py-3 px-4">{d.category}</td>
                <td className="py-3 px-4">{d.download_count}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${d.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {d.is_published ? 'Published' : 'Hidden'}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3">
                  <button onClick={() => openModal(d)} className="text-brand-primary"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(d.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Resource' : 'Add Resource'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm mb-1">Title</label><input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded" /></div>
              
              <div>
                <label className="block text-sm mb-1">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border rounded">
                  <option value="SYLLABUS">Syllabus</option>
                  <option value="TIMETABLE">Timetable</option>
                  <option value="ACADEMIC_CALENDAR">Academic Calendar</option>
                  <option value="RESEARCH_FORMAT">Research Format</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              
              <div><label className="block text-sm mb-1">Description</label><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded" rows="2"></textarea></div>

              <div className="border-t pt-4">
                <label className="block text-sm mb-1">File Upload</label>
                <input type="file" onChange={handleFileUpload} className="text-sm" />
                {isUploading && <span className="text-gray-500 text-sm ml-2">Uploading...</span>}
                {formData.file_url && <span className="text-green-600 text-sm ml-2 font-bold">Attached</span>}
              </div>
              
              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} />
                <label>Published (Visible on website)</label>
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-gray-600">Cancel</button>
                <button type="submit" disabled={isUploading || !formData.file_url} className="px-4 py-2 bg-brand-accent text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default DownloadsManager;
