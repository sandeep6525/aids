import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X, Search, Filter } from 'lucide-react';

const SyllabusManager = () => {
  const [courses, setCourses] = useState([]);
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');

  const semesters = ['Semester I', 'Semester II', 'Semester III', 'Semester IV', 'Semester V', 'Semester VI'];
  const courseTypes = ['Core', 'Elective', 'Lab', 'Project'];

  const [formData, setFormData] = useState({
    programme_id: '',
    semester: 'Semester I',
    code: '',
    course: '',
    type: 'Core',
    credits: 0,
    pdf_url: '',
    is_active: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [progRes, coursesRes] = await Promise.all([
        api.get('/academics/admin/programmes'),
        api.get('/academics/admin/courses')
      ]);
      if (progRes.data.success) setProgrammes(progRes.data.data);
      if (coursesRes.data.success) setCourses(coursesRes.data.data);
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/academics/admin/courses/${editingId}`, formData);
      } else {
        await api.post('/academics/admin/courses', formData);
      }
      setShowModal(false);
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error('Error saving course', error);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      programme_id: programmes.length > 0 ? programmes[0].id : '',
      semester: 'Semester I',
      code: '',
      course: '',
      type: 'Core',
      credits: 0,
      pdf_url: '',
      is_active: true
    });
    setShowModal(true);
  };

  const openEditModal = (course) => {
    setEditingId(course.id);
    setFormData(course);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course from the syllabus?')) {
      try {
        await api.delete(`/academics/admin/courses/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting course', error);
      }
    }
  };

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.course.toLowerCase().includes(searchTerm.toLowerCase()) || c.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSem = semesterFilter ? c.semester === semesterFilter : true;
    return matchesSearch && matchesSem;
  });

  if (loading) return <div className="p-8 font-bold text-brand-primary animate-pulse">Loading Syllabus...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-brand-primary">Syllabus Management</h2>
        <button onClick={openAddModal} className="bg-brand-accent text-white px-5 py-2.5 rounded font-bold flex items-center hover:bg-brand-accent-light transition-colors shadow-sm">
          <Plus className="w-5 h-5 mr-2" /> Add Course
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by course name or code..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border-subtle rounded-lg focus:outline-none focus:border-brand-accent"
          />
        </div>
        <div className="relative w-full md:w-64 flex-shrink-0">
          <Filter className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          <select 
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border-subtle rounded-lg appearance-none focus:outline-none focus:border-brand-accent bg-white"
          >
            <option value="">All Semesters</option>
            {semesters.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border border-border-subtle rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-main border-b border-border-subtle">
              <th className="py-3 px-4 font-bold text-brand-primary uppercase text-xs tracking-wider">Code</th>
              <th className="py-3 px-4 font-bold text-brand-primary uppercase text-xs tracking-wider">Course Name</th>
              <th className="py-3 px-4 font-bold text-brand-primary uppercase text-xs tracking-wider">Semester</th>
              <th className="py-3 px-4 font-bold text-brand-primary uppercase text-xs tracking-wider">Type</th>
              <th className="py-3 px-4 font-bold text-brand-primary uppercase text-xs tracking-wider text-center">Credits</th>
              <th className="py-3 px-4 font-bold text-brand-primary uppercase text-xs tracking-wider">Status</th>
              <th className="py-3 px-4 font-bold text-brand-primary uppercase text-xs tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredCourses.length > 0 ? filteredCourses.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-semibold text-gray-700 whitespace-nowrap">{c.code}</td>
                <td className="py-3 px-4 font-bold text-brand-primary">{c.course}</td>
                <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap">{c.semester}</td>
                <td className="py-3 px-4 text-sm text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs font-semibold">{c.type}</span>
                </td>
                <td className="py-3 px-4 text-center font-bold text-gray-700">{c.credits}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${c.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {c.is_active ? 'Published' : 'Hidden'}
                  </span>
                </td>
                <td className="py-3 px-4 flex justify-end gap-3">
                  <button onClick={() => openEditModal(c)} className="text-brand-primary hover:text-brand-accent transition-colors" title="Edit"><Edit2 className="w-5 h-5" /></button>
                  <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Delete"><Trash2 className="w-5 h-5" /></button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="py-12 text-center text-gray-500 font-medium">No courses found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border-subtle">
            <div className="flex justify-between items-center p-6 border-b border-border-subtle sticky top-0 bg-white z-10 rounded-t-xl">
              <h3 className="text-xl font-extrabold text-brand-primary">{editingId ? 'Edit Syllabus Course' : 'Add Syllabus Course'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-red-500 transition-colors"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-gray-50/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-brand-primary mb-1">Programme *</label>
                  <select required value={formData.programme_id} onChange={e => setFormData({...formData, programme_id: e.target.value})} className="w-full p-2.5 border border-border-subtle rounded-lg bg-white focus:outline-none focus:border-brand-accent">
                    <option value="">Select Programme</option>
                    {programmes.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-primary mb-1">Semester *</label>
                  <select required value={formData.semester} onChange={e => setFormData({...formData, semester: e.target.value})} className="w-full p-2.5 border border-border-subtle rounded-lg bg-white focus:outline-none focus:border-brand-accent">
                    {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-primary mb-1">Course Code *</label>
                  <input type="text" required placeholder="e.g. AI101" value={formData.code || ''} onChange={e => setFormData({...formData, code: e.target.value})} className="w-full p-2.5 border border-border-subtle rounded-lg focus:outline-none focus:border-brand-accent" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-primary mb-1">Course Type *</label>
                  <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-2.5 border border-border-subtle rounded-lg bg-white focus:outline-none focus:border-brand-accent">
                    {courseTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-brand-primary mb-1">Course Name *</label>
                  <input type="text" required placeholder="e.g. Programming with Python" value={formData.course || ''} onChange={e => setFormData({...formData, course: e.target.value})} className="w-full p-2.5 border border-border-subtle rounded-lg focus:outline-none focus:border-brand-accent" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-primary mb-1">Credits *</label>
                  <input type="number" required min="1" max="10" value={formData.credits || 0} onChange={e => setFormData({...formData, credits: e.target.value})} className="w-full p-2.5 border border-border-subtle rounded-lg focus:outline-none focus:border-brand-accent" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-primary mb-1">Syllabus PDF URL</label>
                  <input type="text" placeholder="https://..." value={formData.pdf_url || ''} onChange={e => setFormData({...formData, pdf_url: e.target.value})} className="w-full p-2.5 border border-border-subtle rounded-lg focus:outline-none focus:border-brand-accent" />
                  <p className="text-xs text-gray-500 mt-1">Optional. Link to the detailed course document.</p>
                </div>
              </div>

              <div className="flex items-center mt-2">
                <input 
                  type="checkbox" 
                  id="is_active" 
                  checked={formData.is_active} 
                  onChange={e => setFormData({...formData, is_active: e.target.checked})} 
                  className="w-5 h-5 text-brand-accent border-border-subtle rounded focus:ring-gold"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm font-bold text-brand-primary cursor-pointer">
                  Publish to Public Website
                </label>
              </div>
              
              <div className="flex justify-end gap-3 pt-6 border-t border-border-subtle mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-bold hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-brand-accent text-white rounded-lg font-bold hover:bg-brand-accent-light transition-colors shadow-sm">Save Course</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default SyllabusManager;
