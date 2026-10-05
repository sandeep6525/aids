import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Image as ImageIcon } from 'lucide-react';

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const filters = ['All', 'EVENT', 'WORKSHOP', 'SYMPOSIUM', 'INDUSTRIAL_VISIT', 'OTHER'];

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await api.get('/gallery/albums');
        if (response.data.success) {
          setAlbums(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch albums', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  const filteredAlbums = filter === 'All' 
    ? albums 
    : albums.filter(a => a.category === filter);

  return (
    <div className="bg-bg-main min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-white py-16 md:py-24 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <p className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-3">Campus Life</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6">Life at the Department</h1>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              Explore the vibrant culture, exciting events, and memorable moments captured by our community.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Event 1" className="w-full h-32 md:h-48 object-cover rounded-lg shadow-sm transform hover:-translate-y-1 transition duration-300" />
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Event 2" className="w-full h-32 md:h-48 object-cover rounded-lg shadow-sm transform hover:-translate-y-1 transition duration-300 mt-4 md:mt-8" />
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Event 3" className="w-full h-32 md:h-48 object-cover rounded-lg shadow-sm transform hover:-translate-y-1 transition duration-300" />
            <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Event 4" className="w-full h-32 md:h-48 object-cover rounded-lg shadow-sm transform hover:-translate-y-1 transition duration-300 mt-4 md:mt-8" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Filters */}
        <div className="bg-white p-2 rounded shadow-sm border border-border-subtle flex flex-wrap gap-1 mb-12">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                filter === f 
                  ? 'bg-brand-accent text-white shadow' 
                  : 'bg-transparent text-brand-primary hover:bg-bg-main'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="bg-white p-12 text-center rounded border border-border-subtle shadow-sm">
            <p className="text-brand-primary font-bold">Loading albums...</p>
          </div>
        ) : filteredAlbums.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAlbums.map(album => (
              <div key={album.id} className="bg-white rounded overflow-hidden shadow-sm border border-border-subtle card-hover group cursor-pointer relative">
                <div className="h-60 overflow-hidden relative">
                  <img 
                    src={album.cover_image_url || 'https://via.placeholder.com/600x400?text=Gallery'} 
                    alt={album.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{album.title}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-200">{album.event_date ? new Date(album.event_date).toLocaleDateString() : 'N/A'}</span>
                      <span className="flex items-center text-brand-accent font-bold">
                        <ImageIcon className="w-4 h-4 mr-1" />
                        View Photos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded border border-border-subtle shadow-sm">
            <p className="text-text-secondary text-lg">No albums found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
