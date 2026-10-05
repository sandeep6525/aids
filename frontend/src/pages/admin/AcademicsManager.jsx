import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const AcademicsManager = () => {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', duration: '', description: '', is_active: true, display_order: 0
  });

  useEffect(() => {
    fetchProgrammes();
  }, []);

  const fetchProgrammes = async () => {
    try {
      const response = await api.get('/academics/admin/programmes');
      if (response.data.success) {
        setProgrammes(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching programmes', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/academics/admin/programmes/${editingId}`, formData);
      } else {
        await api.post('/academics/admin/programmes', formData);
      }
      setShowModal(false);
      setEditingId(null);
      fetchProgrammes();
    } catch (error) {
      console.error('Error saving programme', error);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ title: '', duration: '', description: '', is_active: true, display_order: 0 });
    setShowModal(true);
  };

  const openEditModal = (prog) => {
    setEditingId(prog.id);
    setFormData(prog);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this programme?')) {
      try {
        await api.delete(`/academics/admin/programmes/${id}`);
        fetchProgrammes();
      } catch (error) {
        console.error('Error deleting programme', error);
      }
    }
  };

  if (loading) return <div className="p-8">Loading programmes...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">Academics (Programmes) Manager</h2>
        <button onClick={openAddModal} className="bg-brand-accent text-white px-4 py-2 rounded flex items-center hover:bg-brand-accent-light">
          <Plus className="w-4 h-4 mr-2" /> Add Programme
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-main border-b border-border-subtle">
              <th className="py-3 px-4 font-semibold text-brand-primary">Order</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Title</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Duration</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Status</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {programmes.map((p) => (
              <tr key={p.id} className="border-b border-border-subtle hover:bg-gray-50">
                <td className="py-3 px-4">{p.display_order}</td>
                <td className="py-3 px-4 font-medium">{p.title}</td>
                <td className="py-3 px-4">{p.duration}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${p.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {p.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3">
                  <button onClick={() => openEditModal(p)} className="text-brand-primary hover:text-brand-accent"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-border-subtle sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-brand-primary">{editingId ? 'Edit Programme' : 'Add Programme'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div><label className="block text-sm mb-1">Title</label><input type="text" required value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-sm mb-1">Duration</label><input type="text" required value={formData.duration || ''} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full p-2 border rounded" /></div>
              <div><label className="block text-sm mb-1">Description</label><textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded" rows="3"></textarea></div>
              <div><label className="block text-sm mb-1">Display Order</label><input type="number" value={formData.display_order || 0} onChange={e => setFormData({...formData, display_order: e.target.value})} className="w-full p-2 border rounded" /></div>
              
              <div className="flex justify-end gap-2 pt-4 border-t border-border-subtle mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-gray-600">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-accent text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AcademicsManager;
