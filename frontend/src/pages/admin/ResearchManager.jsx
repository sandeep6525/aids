import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X, Upload, CheckCircle } from 'lucide-react';

const ResearchManager = () => {
  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', journal_conference: '', authors: '',
    doi: '', publication_date: '', research_area: 'MACHINE_LEARNING',
    abstract: '', pdf_url: '', external_url: '',
    is_featured: false, is_published: true
  });

  useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    try {
      const response = await api.get('/research/admin');
      if (response.data.success) setResearch(response.data.data);
    } catch (error) {
      console.error('Error fetching research', error);
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
        setFormData(prev => ({ ...prev, pdf_url: response.data.data.url }));
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
        await api.put(`/research/admin/${editingId}`, formData);
      } else {
        await api.post('/research/admin', formData);
      }
      setShowModal(false);
      setEditingId(null);
      fetchResearch();
    } catch (error) {
      console.error('Error saving research', error);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '', journal_conference: '', authors: '',
      doi: '', publication_date: '', research_area: 'MACHINE_LEARNING',
      abstract: '', pdf_url: '', external_url: '',
      is_featured: false, is_published: true
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    const formattedDate = item.publication_date ? new Date(item.publication_date).toISOString().split('T')[0] : '';
    setFormData({ ...item, publication_date: formattedDate });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this publication?')) {
      try {
        await api.delete(`/research/admin/${id}`);
        fetchResearch();
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) return <div className="p-8">Loading research...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">Research Publications Manager</h2>
        <button onClick={openAddModal} className="bg-brand-accent text-white px-4 py-2 rounded flex items-center hover:bg-brand-accent-light">
          <Plus className="w-4 h-4 mr-2" /> Add Publication
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-main border-b border-border-subtle">
              <th className="py-3 px-4 font-semibold text-brand-primary">Date</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Title</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Authors</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Journal/Conference</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {research.map((r) => (
              <tr key={r.id} className="border-b border-border-subtle hover:bg-gray-50">
                <td className="py-3 px-4">{r.publication_date ? new Date(r.publication_date).toLocaleDateString() : 'N/A'}</td>
                <td className="py-3 px-4 font-medium">{r.title}</td>
                <td className="py-3 px-4 text-sm">{r.authors}</td>
                <td className="py-3 px-4 text-sm">{r.journal_conference}</td>
                <td className="py-3 px-4 flex gap-3">
                  <button onClick={() => openEditModal(r)} className="text-brand-primary hover:text-brand-accent"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
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
              <h3 className="text-xl font-bold text-brand-primary">{editingId ? 'Edit Publication' : 'Add Publication'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="block text-sm mb-1">Title</label><input type="text" required value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div className="col-span-2"><label className="block text-sm mb-1">Authors</label><input type="text" required value={formData.authors || ''} onChange={e => setFormData({...formData, authors: e.target.value})} className="w-full p-2 border rounded" /></div>
                
                <div><label className="block text-sm mb-1">Journal/Conference</label><input type="text" value={formData.journal_conference || ''} onChange={e => setFormData({...formData, journal_conference: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Date</label><input type="date" value={formData.publication_date || ''} onChange={e => setFormData({...formData, publication_date: e.target.value})} className="w-full p-2 border rounded" /></div>
                
                <div><label className="block text-sm mb-1">DOI</label><input type="text" value={formData.doi || ''} onChange={e => setFormData({...formData, doi: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Research Area</label><input type="text" value={formData.research_area || ''} onChange={e => setFormData({...formData, research_area: e.target.value})} className="w-full p-2 border rounded" /></div>
                
                <div><label className="block text-sm mb-1">External Link</label><input type="url" value={formData.external_url || ''} onChange={e => setFormData({...formData, external_url: e.target.value})} className="w-full p-2 border rounded" /></div>
                
                <div className="flex items-center gap-4 mt-6">
                  <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} /> Published</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} /> Featured</label>
                </div>

                <div className="col-span-2"><label className="block text-sm mb-1">Abstract</label><textarea value={formData.abstract || ''} onChange={e => setFormData({...formData, abstract: e.target.value})} className="w-full p-2 border rounded" rows="4"></textarea></div>
                
                <div className="col-span-2 border-t pt-4">
                  <label className="block text-sm mb-1">Upload PDF</label>
                  <div className="flex gap-2 items-center">
                    <input type="file" accept="application/pdf" onChange={handleFileUpload} className="w-full p-2 border rounded" />
                    {isUploading && <span className="text-gray-500">Uploading...</span>}
                    {formData.pdf_url && <span className="text-green-600 font-bold">Uploaded</span>}
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
export default ResearchManager;
