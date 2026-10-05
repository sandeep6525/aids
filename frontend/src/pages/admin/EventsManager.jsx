import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X, Upload, CheckCircle } from 'lucide-react';

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', description: '', event_type: 'SEMINAR',
    event_date: '', start_time: '', end_time: '',
    venue: '', speaker: '', speaker_designation: '',
    poster_url: '', registration_url: '', registration_deadline: '',
    contact_person: '', status: 'UPCOMING', featured: false
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events/admin');
      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching events', error);
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
        setFormData(prev => ({ ...prev, poster_url: response.data.data.url }));
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
        await api.put(`/events/admin/${editingId}`, formData);
      } else {
        await api.post('/events/admin', formData);
      }
      setShowModal(false);
      setEditingId(null);
      fetchEvents();
    } catch (error) {
      console.error('Error saving event', error);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '', description: '', event_type: 'SEMINAR',
      event_date: '', start_time: '', end_time: '',
      venue: '', speaker: '', speaker_designation: '',
      poster_url: '', registration_url: '', registration_deadline: '',
      contact_person: '', status: 'UPCOMING', featured: false
    });
    setShowModal(true);
  };

  const openEditModal = (evt) => {
    setEditingId(evt.id);
    // Format dates for input fields
    const formattedDate = evt.event_date ? new Date(evt.event_date).toISOString().split('T')[0] : '';
    const formattedDeadline = evt.registration_deadline ? new Date(evt.registration_deadline).toISOString().split('T')[0] : '';
    setFormData({
      ...evt,
      event_date: formattedDate,
      registration_deadline: formattedDeadline
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/events/admin/${id}`);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event', error);
      }
    }
  };

  if (loading) return <div className="p-8">Loading events...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">Events Manager</h2>
        <button onClick={openAddModal} className="bg-brand-accent text-white px-4 py-2 rounded flex items-center hover:bg-brand-accent-light">
          <Plus className="w-4 h-4 mr-2" /> Add Event
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-main border-b border-border-subtle">
              <th className="py-3 px-4 font-semibold text-brand-primary">Date</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Title</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Type</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Status</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((evt) => (
              <tr key={evt.id} className="border-b border-border-subtle hover:bg-gray-50">
                <td className="py-3 px-4">{new Date(evt.event_date).toLocaleDateString()}</td>
                <td className="py-3 px-4 font-medium">{evt.title}</td>
                <td className="py-3 px-4">{evt.event_type}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${evt.status === 'UPCOMING' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {evt.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-3">
                  <button onClick={() => openEditModal(evt)} className="text-brand-primary hover:text-brand-accent"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(evt.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
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
              <h3 className="text-xl font-bold text-brand-primary">{editingId ? 'Edit Event' : 'Add Event'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="block text-sm mb-1">Title</label><input type="text" required value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div>
                  <label className="block text-sm mb-1">Event Type</label>
                  <select required value={formData.event_type} onChange={e => setFormData({...formData, event_type: e.target.value})} className="w-full p-2 border rounded">
                    <option value="SEMINAR">Seminar</option>
                    <option value="WORKSHOP">Workshop</option>
                    <option value="CONFERENCE">Conference</option>
                    <option value="GUEST_LECTURE">Guest Lecture</option>
                    <option value="HACKATHON">Hackathon</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div><label className="block text-sm mb-1">Status</label>
                  <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2 border rounded">
                    <option value="UPCOMING">Upcoming</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
                <div><label className="block text-sm mb-1">Event Date</label><input type="date" required value={formData.event_date || ''} onChange={e => setFormData({...formData, event_date: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Registration Deadline</label><input type="date" value={formData.registration_deadline || ''} onChange={e => setFormData({...formData, registration_deadline: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Start Time</label><input type="time" value={formData.start_time || ''} onChange={e => setFormData({...formData, start_time: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">End Time</label><input type="time" value={formData.end_time || ''} onChange={e => setFormData({...formData, end_time: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Venue</label><input type="text" value={formData.venue || ''} onChange={e => setFormData({...formData, venue: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Registration URL</label><input type="url" value={formData.registration_url || ''} onChange={e => setFormData({...formData, registration_url: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Speaker</label><input type="text" value={formData.speaker || ''} onChange={e => setFormData({...formData, speaker: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Speaker Designation</label><input type="text" value={formData.speaker_designation || ''} onChange={e => setFormData({...formData, speaker_designation: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div className="col-span-2"><label className="block text-sm mb-1">Description</label><textarea required value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded" rows="3"></textarea></div>
                
                <div className="col-span-2 border-t pt-4">
                  <label className="block text-sm mb-1">Poster Upload</label>
                  <div className="flex gap-2 items-center">
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current.click()} disabled={isUploading} className="bg-gray-100 px-4 py-2 rounded flex items-center">
                      <Upload className="w-4 h-4 mr-2" /> {isUploading ? 'Uploading...' : 'Choose Poster'}
                    </button>
                    {formData.poster_url && <span className="text-green-600 text-sm flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> Uploaded</span>}
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
export default EventsManager;
