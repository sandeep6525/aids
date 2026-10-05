import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X, Upload, CheckCircle } from 'lucide-react';

const PlacementsManager = () => {
  const [activeTab, setActiveTab] = useState('statistics'); // 'statistics' or 'students'
  
  const [stats, setStats] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showStatModal, setShowStatModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const [statData, setStatData] = useState({
    placement_year: new Date().getFullYear(), total_students: 0,
    placed_students: 0, placement_percentage: 0, highest_package: 0,
    average_package: 0, lowest_package: 0
  });

  const [studentData, setStudentData] = useState({
    name: '', programme: 'B.Tech AI & DS', graduation_year: new Date().getFullYear(),
    company: '', package: 0, role: '', photo_url: '', is_featured: false
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'statistics') {
        const res = await api.get('/placements/admin/statistics');
        if (res.data.success) setStats(res.data.data);
      } else {
        const res = await api.get('/placements/admin/students');
        if (res.data.success) setStudents(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching data', error);
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
        setStudentData(prev => ({ ...prev, photo_url: response.data.data.url }));
      }
    } catch (error) {
      alert('Upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleStatSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/placements/admin/statistics/${editingId}`, statData);
      } else {
        await api.post('/placements/admin/statistics', statData);
      }
      setShowStatModal(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/placements/admin/students/${editingId}`, studentData);
      } else {
        await api.post('/placements/admin/students', studentData);
      }
      setShowStudentModal(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStat = async (id) => {
    if (window.confirm('Delete this statistic?')) {
      await api.delete(`/placements/admin/statistics/${id}`);
      fetchData();
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Delete this student?')) {
      await api.delete(`/placements/admin/students/${id}`);
      fetchData();
    }
  };

  const openStatModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setStatData(item);
    } else {
      setEditingId(null);
      setStatData({ placement_year: new Date().getFullYear(), total_students: 0, placed_students: 0, placement_percentage: 0, highest_package: 0, average_package: 0, lowest_package: 0 });
    }
    setShowStatModal(true);
  };

  const openStudentModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setStudentData(item);
    } else {
      setEditingId(null);
      setStudentData({ name: '', programme: 'B.Tech AI & DS', graduation_year: new Date().getFullYear(), company: '', package: 0, role: '', photo_url: '', is_featured: false });
    }
    setShowStudentModal(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">Placements Manager</h2>
        <div className="flex gap-4">
          <button 
            className={`px-4 py-2 font-bold ${activeTab === 'statistics' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-500'}`}
            onClick={() => setActiveTab('statistics')}
          >
            Statistics
          </button>
          <button 
            className={`px-4 py-2 font-bold ${activeTab === 'students' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-500'}`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-8">Loading...</div>
      ) : activeTab === 'statistics' ? (
        <div>
          <button onClick={() => openStatModal()} className="bg-brand-accent text-white px-4 py-2 rounded flex items-center mb-4">
            <Plus className="w-4 h-4 mr-2" /> Add Statistic
          </button>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-main border-b">
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Placed (%)</th>
                <th className="py-3 px-4">Highest (LPA)</th>
                <th className="py-3 px-4">Average (LPA)</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.map(s => (
                <tr key={s.id} className="border-b">
                  <td className="py-3 px-4">{s.placement_year}</td>
                  <td className="py-3 px-4">{s.total_students}</td>
                  <td className="py-3 px-4">{s.placed_students} ({s.placement_percentage}%)</td>
                  <td className="py-3 px-4">₹{s.highest_package}</td>
                  <td className="py-3 px-4">₹{s.average_package}</td>
                  <td className="py-3 px-4 flex gap-3">
                    <button onClick={() => openStatModal(s)} className="text-brand-primary"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => deleteStat(s.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
           <button onClick={() => openStudentModal()} className="bg-brand-accent text-white px-4 py-2 rounded flex items-center mb-4">
            <Plus className="w-4 h-4 mr-2" /> Add Student
          </button>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-main border-b">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id} className="border-b">
                  <td className="py-3 px-4 font-bold">{s.name} <br/><span className="text-xs text-gray-500">{s.graduation_year}</span></td>
                  <td className="py-3 px-4">{s.company}</td>
                  <td className="py-3 px-4">{s.role}</td>
                  <td className="py-3 px-4">₹{s.package} LPA</td>
                  <td className="py-3 px-4">{s.is_featured ? 'Yes' : 'No'}</td>
                  <td className="py-3 px-4 flex gap-3">
                    <button onClick={() => openStudentModal(s)} className="text-brand-primary"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => deleteStudent(s.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stat Modal */}
      {showStatModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Statistic</h3>
            <form onSubmit={handleStatSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm">Year</label><input type="number" value={statData.placement_year} onChange={e => setStatData({...statData, placement_year: e.target.value})} className="w-full p-2 border" /></div>
                <div><label className="block text-sm">Total Students</label><input type="number" value={statData.total_students} onChange={e => setStatData({...statData, total_students: e.target.value})} className="w-full p-2 border" /></div>
                <div><label className="block text-sm">Placed Students</label><input type="number" value={statData.placed_students} onChange={e => setStatData({...statData, placed_students: e.target.value})} className="w-full p-2 border" /></div>
                <div><label className="block text-sm">Percentage (%)</label><input type="number" step="0.01" value={statData.placement_percentage} onChange={e => setStatData({...statData, placement_percentage: e.target.value})} className="w-full p-2 border" /></div>
                <div><label className="block text-sm">Highest (LPA)</label><input type="number" step="0.01" value={statData.highest_package} onChange={e => setStatData({...statData, highest_package: e.target.value})} className="w-full p-2 border" /></div>
                <div><label className="block text-sm">Average (LPA)</label><input type="number" step="0.01" value={statData.average_package} onChange={e => setStatData({...statData, average_package: e.target.value})} className="w-full p-2 border" /></div>
                <div><label className="block text-sm">Lowest (LPA)</label><input type="number" step="0.01" value={statData.lowest_package} onChange={e => setStatData({...statData, lowest_package: e.target.value})} className="w-full p-2 border" /></div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setShowStatModal(false)} className="px-4 py-2 border">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-accent text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl">
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit' : 'Add'} Student</h3>
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm">Name</label><input type="text" value={studentData.name} onChange={e => setStudentData({...studentData, name: e.target.value})} className="w-full p-2 border" required /></div>
                <div><label className="block text-sm">Company</label><input type="text" value={studentData.company} onChange={e => setStudentData({...studentData, company: e.target.value})} className="w-full p-2 border" required /></div>
                <div><label className="block text-sm">Role</label><input type="text" value={studentData.role} onChange={e => setStudentData({...studentData, role: e.target.value})} className="w-full p-2 border" /></div>
                <div><label className="block text-sm">Package (LPA)</label><input type="number" step="0.01" value={studentData.package} onChange={e => setStudentData({...studentData, package: e.target.value})} className="w-full p-2 border" /></div>
                <div><label className="block text-sm">Graduation Year</label><input type="number" value={studentData.graduation_year} onChange={e => setStudentData({...studentData, graduation_year: e.target.value})} className="w-full p-2 border" /></div>
                <div><label className="block text-sm">Programme</label><input type="text" value={studentData.programme} onChange={e => setStudentData({...studentData, programme: e.target.value})} className="w-full p-2 border" /></div>
                
                <div className="col-span-2 flex items-center gap-2">
                  <input type="checkbox" checked={studentData.is_featured} onChange={e => setStudentData({...studentData, is_featured: e.target.checked})} />
                  <label className="text-sm">Featured on Homepage</label>
                </div>

                <div className="col-span-2 border-t pt-2">
                  <label className="block text-sm mb-1">Photo Upload</label>
                  <input type="file" onChange={handleFileUpload} className="text-sm" />
                  {isUploading && <span className="text-gray-500 text-sm ml-2">Uploading...</span>}
                  {studentData.photo_url && <span className="text-green-600 text-sm ml-2 font-bold">Uploaded</span>}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setShowStudentModal(false)} className="px-4 py-2 border">Cancel</button>
                <button type="submit" disabled={isUploading} className="px-4 py-2 bg-brand-accent text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default PlacementsManager;
