import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X, Upload, CheckCircle } from 'lucide-react';

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', description: '', problem_statement: '',
    solution: '', technologies: '', category: 'MACHINE_LEARNING',
    team_members: '', guide: '', year: new Date().getFullYear(),
    thumbnail_url: '', github_url: '', demo_url: '',
    featured: false, status: 'PUBLISHED'
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects/admin');
      if (response.data.success) setProjects(response.data.data);
    } catch (error) {
      console.error('Error fetching projects', error);
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
        setFormData(prev => ({ ...prev, thumbnail_url: response.data.data.url }));
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
        await api.put(`/projects/admin/${editingId}`, formData);
      } else {
        await api.post('/projects/admin', formData);
      }
      setShowModal(false);
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project', error);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '', description: '', problem_statement: '',
      solution: '', technologies: '', category: 'MACHINE_LEARNING',
      team_members: '', guide: '', year: new Date().getFullYear(),
      thumbnail_url: '', github_url: '', demo_url: '',
      featured: false, status: 'PUBLISHED'
    });
    setShowModal(true);
  };

  const openEditModal = (proj) => {
    setEditingId(proj.id);
    setFormData(proj);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/admin/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project', error);
      }
    }
  };

  if (loading) return <div className="p-8">Loading projects...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">Projects Manager</h2>
        <button onClick={openAddModal} className="bg-brand-accent text-white px-4 py-2 rounded flex items-center hover:bg-brand-accent-light">
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-main border-b border-border-subtle">
              <th className="py-3 px-4 font-semibold text-brand-primary">Thumbnail</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Title</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Category</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Year</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Status</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-border-subtle hover:bg-gray-50">
                <td className="py-3 px-4">
                  {p.thumbnail_url ? <img src={p.thumbnail_url} alt={p.title} className="h-10 w-16 object-cover rounded" /> : <div className="h-10 w-16 bg-gray-200 rounded"></div>}
                </td>
                <td className="py-3 px-4 font-medium">{p.title}</td>
                <td className="py-3 px-4">{p.category}</td>
                <td className="py-3 px-4">{p.year}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${p.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {p.status}
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-border-subtle sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-brand-primary">{editingId ? 'Edit Project' : 'Add Project'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="block text-sm mb-1">Title</label><input type="text" required value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded" /></div>
                
                <div>
                  <label className="block text-sm mb-1">Category</label>
                  <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border rounded">
                    <option value="MACHINE_LEARNING">Machine Learning</option>
                    <option value="DEEP_LEARNING">Deep Learning</option>
                    <option value="NLP">NLP</option>
                    <option value="COMPUTER_VISION">Computer Vision</option>
                    <option value="ROBOTICS">Robotics</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div><label className="block text-sm mb-1">Year</label><input type="number" required value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full p-2 border rounded" /></div>
                
                <div><label className="block text-sm mb-1">Status</label>
                  <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2 border rounded">
                    <option value="PUBLISHED">Published</option>
                    <option value="DRAFT">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1">Featured</label>
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="mt-2" />
                </div>

                <div className="col-span-2"><label className="block text-sm mb-1">Description</label><textarea required value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded" rows="3"></textarea></div>
                <div className="col-span-2"><label className="block text-sm mb-1">Problem Statement</label><textarea value={formData.problem_statement || ''} onChange={e => setFormData({...formData, problem_statement: e.target.value})} className="w-full p-2 border rounded" rows="2"></textarea></div>
                <div className="col-span-2"><label className="block text-sm mb-1">Solution</label><textarea value={formData.solution || ''} onChange={e => setFormData({...formData, solution: e.target.value})} className="w-full p-2 border rounded" rows="2"></textarea></div>
                
                <div><label className="block text-sm mb-1">Technologies</label><input type="text" value={formData.technologies || ''} onChange={e => setFormData({...formData, technologies: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Team Members</label><input type="text" value={formData.team_members || ''} onChange={e => setFormData({...formData, team_members: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Faculty Guide</label><input type="text" value={formData.guide || ''} onChange={e => setFormData({...formData, guide: e.target.value})} className="w-full p-2 border rounded" /></div>
                
                <div><label className="block text-sm mb-1">GitHub URL</label><input type="url" value={formData.github_url || ''} onChange={e => setFormData({...formData, github_url: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Demo URL</label><input type="url" value={formData.demo_url || ''} onChange={e => setFormData({...formData, demo_url: e.target.value})} className="w-full p-2 border rounded" /></div>
                
                <div className="col-span-2 border-t pt-4">
                  <label className="block text-sm mb-1">Thumbnail Upload</label>
                  <div className="flex gap-2 items-center">
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current.click()} disabled={isUploading} className="bg-gray-100 px-4 py-2 rounded flex items-center">
                      <Upload className="w-4 h-4 mr-2" /> {isUploading ? 'Uploading...' : 'Choose Thumbnail'}
                    </button>
                    {formData.thumbnail_url && <span className="text-green-600 text-sm flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> Uploaded</span>}
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
export default ProjectsManager;
