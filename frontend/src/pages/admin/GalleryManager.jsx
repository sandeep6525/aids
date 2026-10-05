import React, { useState, useEffect, useRef } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, X, Upload, CheckCircle, Image as ImageIcon } from 'lucide-react';

const GalleryManager = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '', description: '', cover_image_url: '',
    event_name: '', event_date: '', category: 'EVENT',
    is_published: true, display_order: 0
  });

  const [activeAlbum, setActiveAlbum] = useState(null);
  const [images, setImages] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageData, setImageData] = useState({ image_url: '', caption: '', alt_text: '', display_order: 0 });
  const imageInputRef = useRef(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await api.get('/gallery/admin/albums');
      if (response.data.success) setAlbums(response.data.data);
    } catch (error) {
      console.error('Error fetching albums', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchImages = async (albumId) => {
    try {
      const response = await api.get(`/gallery/albums/${albumId}/images`);
      if (response.data.success) setImages(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = async (e, setUrlCallback) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const data = new FormData();
    data.append('file', file);
    try {
      const response = await api.post('/admin/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (response.data.success) {
        setUrlCallback(response.data.data.url);
      }
    } catch (error) {
      alert('Upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAlbumSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/gallery/admin/albums/${editingId}`, formData);
      } else {
        await api.post('/gallery/admin/albums', formData);
      }
      setShowModal(false);
      setEditingId(null);
      fetchAlbums();
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/gallery/admin/albums/${activeAlbum.id}/images`, imageData);
      setShowImageModal(false);
      fetchImages(activeAlbum.id);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAlbum = async (id) => {
    if (window.confirm('Delete album? This will delete all images inside it.')) {
      await api.delete(`/gallery/admin/albums/${id}`);
      fetchAlbums();
    }
  };

  const deleteImage = async (id) => {
    if (window.confirm('Delete image?')) {
      await api.delete(`/gallery/admin/images/${id}`);
      fetchImages(activeAlbum.id);
    }
  };

  const openAlbumModal = (album = null) => {
    if (album) {
      setEditingId(album.id);
      const formattedDate = album.event_date ? new Date(album.event_date).toISOString().split('T')[0] : '';
      setFormData({ ...album, event_date: formattedDate });
    } else {
      setEditingId(null);
      setFormData({ title: '', description: '', cover_image_url: '', event_name: '', event_date: '', category: 'EVENT', is_published: true, display_order: 0 });
    }
    setShowModal(true);
  };

  if (activeAlbum) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6">
        <button onClick={() => setActiveAlbum(null)} className="text-gray-500 mb-4">&larr; Back to Albums</button>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-brand-primary">{activeAlbum.title}</h2>
            <p className="text-text-secondary text-sm">Manage images in this album</p>
          </div>
          <button onClick={() => { setImageData({ image_url: '', caption: '', alt_text: '', display_order: 0 }); setShowImageModal(true); }} className="bg-brand-accent text-white px-4 py-2 rounded flex items-center">
            <Plus className="w-4 h-4 mr-2" /> Add Image
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map(img => (
            <div key={img.id} className="relative group rounded overflow-hidden border border-border-subtle bg-gray-100">
              <img src={img.image_url} alt={img.alt_text || 'Gallery Image'} className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <button onClick={() => deleteImage(img.id)} className="text-white bg-red-600 p-2 rounded-full hover:bg-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Image Add Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Add Image</h3>
              <form onSubmit={handleImageSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Image Upload</label>
                  <input type="file" ref={imageInputRef} onChange={(e) => handleFileUpload(e, url => setImageData({...imageData, image_url: url}))} className="hidden" />
                  <button type="button" onClick={() => imageInputRef.current.click()} className="w-full border p-2 rounded bg-gray-50 text-sm">
                    {isUploading ? 'Uploading...' : 'Choose Image'}
                  </button>
                  {imageData.image_url && <p className="text-green-600 text-xs mt-1">Image attached</p>}
                </div>
                <div><label className="block text-sm">Caption</label><input type="text" value={imageData.caption} onChange={e => setImageData({...imageData, caption: e.target.value})} className="w-full p-2 border" /></div>
                <div><label className="block text-sm">Order</label><input type="number" value={imageData.display_order} onChange={e => setImageData({...imageData, display_order: e.target.value})} className="w-full p-2 border" /></div>
                <div className="flex justify-end gap-2 pt-4">
                  <button type="button" onClick={() => setShowImageModal(false)} className="px-4 py-2 border">Cancel</button>
                  <button type="submit" disabled={isUploading || !imageData.image_url} className="px-4 py-2 bg-brand-accent text-white">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (loading) return <div className="p-8">Loading albums...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">Gallery Albums</h2>
        <button onClick={() => openAlbumModal()} className="bg-brand-accent text-white px-4 py-2 rounded flex items-center hover:bg-brand-accent-light">
          <Plus className="w-4 h-4 mr-2" /> Create Album
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((a) => (
          <div key={a.id} className="border border-border-subtle rounded overflow-hidden shadow-sm">
            <div className="h-48 bg-gray-100 relative group cursor-pointer" onClick={() => { setActiveAlbum(a); fetchImages(a.id); }}>
              <img src={a.cover_image_url || 'https://via.placeholder.com/600x400?text=No+Cover'} alt={a.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-primary/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white font-bold">
                <ImageIcon className="w-6 h-6 mr-2" /> Manage Images
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-brand-primary truncate">{a.title}</h3>
              <p className="text-xs text-gray-500 mb-4">{a.category} • {a.is_published ? 'Published' : 'Draft'}</p>
              <div className="flex justify-between items-center">
                <button onClick={() => { setActiveAlbum(a); fetchImages(a.id); }} className="text-sm font-semibold text-brand-accent">Manage Images</button>
                <div className="flex gap-2">
                  <button onClick={() => openAlbumModal(a)} className="text-brand-primary p-1"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => deleteAlbum(a.id)} className="text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Album' : 'Create Album'}</h3>
            <form onSubmit={handleAlbumSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="block text-sm mb-1">Title</label><input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Event Name</label><input type="text" value={formData.event_name} onChange={e => setFormData({...formData, event_name: e.target.value})} className="w-full p-2 border rounded" /></div>
                <div><label className="block text-sm mb-1">Event Date</label><input type="date" value={formData.event_date} onChange={e => setFormData({...formData, event_date: e.target.value})} className="w-full p-2 border rounded" /></div>
                
                <div>
                  <label className="block text-sm mb-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border rounded">
                    <option value="EVENT">Event</option>
                    <option value="WORKSHOP">Workshop</option>
                    <option value="SYMPOSIUM">Symposium</option>
                    <option value="INDUSTRIAL_VISIT">Industrial Visit</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div><label className="block text-sm mb-1">Display Order</label><input type="number" value={formData.display_order} onChange={e => setFormData({...formData, display_order: e.target.value})} className="w-full p-2 border rounded" /></div>

                <div className="col-span-2"><label className="block text-sm mb-1">Description</label><textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded" rows="3"></textarea></div>

                <div className="col-span-2 border-t pt-4">
                  <label className="block text-sm mb-1">Cover Image Upload</label>
                  <input type="file" ref={fileInputRef} onChange={(e) => handleFileUpload(e, url => setFormData({...formData, cover_image_url: url}))} className="hidden" />
                  <button type="button" onClick={() => fileInputRef.current.click()} className="bg-gray-100 px-4 py-2 rounded text-sm">
                    {isUploading ? 'Uploading...' : 'Choose Cover Image'}
                  </button>
                  {formData.cover_image_url && <span className="text-green-600 text-sm ml-2">Attached</span>}
                </div>
                
                <div className="col-span-2 flex items-center gap-2 mt-4">
                  <input type="checkbox" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} />
                  <label>Published</label>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded text-gray-600">Cancel</button>
                <button type="submit" disabled={isUploading} className="px-4 py-2 bg-brand-accent text-white rounded">Save Album</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default GalleryManager;
