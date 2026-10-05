import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, Image as ImageIcon, Video, X, Upload } from 'lucide-react';

const HomeSliderManager = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    media_type: 'IMAGE',
    media_url: '',
    poster_url: '',
    mobile_media_url: '',
    button_text: '',
    button_url: '',
    secondary_button_text: '',
    secondary_button_url: '',
    display_order: 0,
    is_active: true,
    is_featured: true
  });
  
  const fileInputRef = useRef(null);
  const posterInputRef = useRef(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await api.get('/home-slider/admin');
      if (response.data.success) {
        setSlides(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching slides', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        // Build absolute URL assuming backend is on port 5000 for this demo
        const url = response.data.data.url;
        setFormData(prev => ({ ...prev, [field]: url }));
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Upload failed. Check file size/type.');
    } finally {
      setIsUploading(false);
    }
  };

  const openModal = (slide = null) => {
    if (slide) {
      setFormData(slide);
    } else {
      setFormData({
        title: '', subtitle: '', description: '', media_type: 'IMAGE',
        media_url: '', poster_url: '', mobile_media_url: '', button_text: '', button_url: '',
        secondary_button_text: '', secondary_button_url: '', display_order: 0,
        is_active: true, is_featured: true
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/home-slider/admin/${formData.id}`, formData);
      } else {
        await api.post('/home-slider/admin', formData);
      }
      setShowModal(false);
      fetchSlides();
      // Reset form
      setFormData({
        title: '', subtitle: '', description: '', media_type: 'IMAGE',
        media_url: '', poster_url: '', mobile_media_url: '', button_text: '', button_url: '',
        secondary_button_text: '', secondary_button_url: '', display_order: 0,
        is_active: true, is_featured: true
      });
    } catch (error) {
      console.error('Error saving slide', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      try {
        await api.delete(`/home-slider/admin/${id}`);
        fetchSlides();
      } catch (error) {
        console.error('Error deleting slide', error);
      }
    }
  };

  if (loading) return <div className="p-8">Loading slides...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">Home Slider</h2>
        <button onClick={() => openModal()} className="bg-brand-accent text-white px-4 py-2 rounded flex items-center hover:bg-brand-accent-light transition">
          <Plus className="w-4 h-4 mr-2" />
          Add Slide
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-main border-b border-border-subtle">
              <th className="py-3 px-4 font-semibold text-brand-primary">Order</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Media</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Title</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Status</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slides.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">No slides found. Click 'Add Slide' to create one.</td>
              </tr>
            ) : (
              slides.map((slide) => (
                <tr key={slide.id} className="border-b border-border-subtle hover:bg-gray-50">
                  <td className="py-3 px-4">{slide.display_order}</td>
                  <td className="py-3 px-4 flex items-center">
                    {slide.media_type === 'VIDEO' ? <Video className="w-5 h-5 text-gray-500 mr-2" /> : <ImageIcon className="w-5 h-5 text-gray-500 mr-2" />}
                    {slide.media_type === 'IMAGE' ? (
                      <img src={slide.media_url} alt="thumbnail" className="h-10 w-16 object-cover rounded" />
                    ) : (
                      <span className="text-xs truncate w-32 inline-block">Video File</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium">{slide.title}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${slide.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {slide.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-3">
                    <button onClick={() => openModal(slide)} className="text-brand-primary hover:text-brand-accent"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(slide.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-border-subtle sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-brand-primary">Add New Slide</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Subtitle</label>
                  <input type="text" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Media Type</label>
                  <select value={formData.media_type} onChange={e => setFormData({...formData, media_type: e.target.value})} className="w-full p-2 border rounded">
                    <option value="IMAGE">Image</option>
                    <option value="VIDEO">Video</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded" rows="3"></textarea>
                </div>
                
                {/* Media Upload */}
                <div className="col-span-2 border-t border-border-subtle pt-4">
                  <label className="block text-sm font-medium mb-1">Upload {formData.media_type === 'IMAGE' ? 'Image' : 'Video'}</label>
                  <div className="flex gap-2 items-center">
                    <input 
                      type="file" 
                      accept={formData.media_type === 'IMAGE' ? "image/*" : "video/*"} 
                      ref={fileInputRef}
                      onChange={(e) => handleFileUpload(e, 'media_url')}
                      className="hidden" 
                    />
                    <button type="button" onClick={() => fileInputRef.current.click()} disabled={isUploading} className="bg-gray-100 hover:bg-gray-200 text-brand-primary px-4 py-2 rounded flex items-center">
                      <Upload className="w-4 h-4 mr-2" /> {isUploading ? 'Uploading...' : 'Choose File'}
                    </button>
                    {formData.media_url && <span className="text-green-600 text-sm flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> Uploaded</span>}
                  </div>
                </div>

                <div className="col-span-2 border-t border-border-subtle pt-4">
                  <label className="block text-sm font-medium mb-1">Mobile Image (Optional)</label>
                  <div className="flex gap-2 items-center">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(e, 'mobile_media_url')}
                      className="hidden" 
                      id="mobile_media_upload"
                    />
                    <button type="button" onClick={() => document.getElementById('mobile_media_upload').click()} disabled={isUploading} className="bg-gray-100 hover:bg-gray-200 text-brand-primary px-4 py-2 rounded flex items-center">
                      <Upload className="w-4 h-4 mr-2" /> {isUploading ? 'Uploading...' : 'Choose Mobile Image'}
                    </button>
                    {formData.mobile_media_url && <span className="text-green-600 text-sm flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> Uploaded</span>}
                  </div>
                </div>

                {formData.media_type === 'VIDEO' && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Video Poster (Thumbnail Image)</label>
                    <div className="flex gap-2 items-center">
                      <input 
                        type="file" 
                        accept="image/*" 
                        ref={posterInputRef}
                        onChange={(e) => handleFileUpload(e, 'poster_url')}
                        className="hidden" 
                      />
                      <button type="button" onClick={() => posterInputRef.current.click()} disabled={isUploading} className="bg-gray-100 hover:bg-gray-200 text-brand-primary px-4 py-2 rounded flex items-center">
                        <Upload className="w-4 h-4 mr-2" /> {isUploading ? 'Uploading...' : 'Choose Poster'}
                      </button>
                      {formData.poster_url && <span className="text-green-600 text-sm flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> Uploaded</span>}
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-1">Primary Button Text</label>
                  <input type="text" value={formData.button_text} onChange={e => setFormData({...formData, button_text: e.target.value})} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Primary Button URL</label>
                  <input type="text" value={formData.button_url} onChange={e => setFormData({...formData, button_url: e.target.value})} className="w-full p-2 border rounded" placeholder="/about" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Display Order</label>
                  <input type="number" value={formData.display_order} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})} className="w-full p-2 border rounded" />
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} />
                    Published / Active
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t border-border-subtle mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={isUploading || !formData.media_url} className="px-4 py-2 bg-brand-accent text-white rounded hover:bg-brand-accent-light disabled:opacity-50">Save Slide</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Quick CheckCircle polyfill for this file
const CheckCircle = ({className}) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export default HomeSliderManager;
