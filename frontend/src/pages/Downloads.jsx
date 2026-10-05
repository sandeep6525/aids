import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Download as DownloadIcon, FileText, Calendar } from 'lucide-react';

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const response = await api.get('/downloads');
        if (response.data.success) {
          setDownloads(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch downloads', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDownloads();
  }, []);

  const handleDownloadClick = async (id, url) => {
    try {
      await api.post(`/downloads/${id}/increment`);
      window.open(url, '_blank');
      // Optimistically increment local count
      setDownloads(downloads.map(d => d.id === id ? { ...d, download_count: d.download_count + 1 } : d));
    } catch (error) {
      console.error(error);
      window.open(url, '_blank'); // Still open it even if tracking fails
    }
  };

  return (
    <div className="bg-bg-main min-h-screen pb-20">
      <div className="bg-white py-16 md:py-24 border-b border-border-subtle text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bg-main border border-brand-accent/30 mb-6">
            <DownloadIcon className="w-8 h-8 text-brand-accent" />
          </div>
          <p className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-3">Academic Resources</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6">Downloads & Resources</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Access syllabi, academic calendars, timetables, study materials, and other important documents easily in one place.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {loading ? (
          <div className="bg-white p-12 text-center rounded border border-border-subtle shadow-sm">
            <p className="text-brand-primary font-bold">Loading resources...</p>
          </div>
        ) : downloads.length > 0 ? (
          <div className="bg-white rounded shadow-sm border border-border-subtle overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-border-subtle">
                  <th className="py-4 px-6 font-semibold text-brand-primary">Resource Title</th>
                  <th className="py-4 px-6 font-semibold text-brand-primary hidden md:table-cell">Category</th>
                  <th className="py-4 px-6 font-semibold text-brand-primary hidden sm:table-cell">Date</th>
                  <th className="py-4 px-6 font-semibold text-brand-primary text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {downloads.map((item) => (
                  <tr key={item.id} className="border-b border-border-subtle hover:bg-bg-main transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-3">
                        <FileText className="w-6 h-6 text-brand-accent mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-brand-primary text-lg">{item.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          <span className="md:hidden mt-2 inline-block px-2 py-1 bg-gray-100 text-xs rounded text-gray-600">{item.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 hidden md:table-cell">
                      <span className="px-3 py-1 bg-gray-100 text-sm font-semibold text-gray-700 rounded-full border border-gray-200">
                        {item.category.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6 hidden sm:table-cell text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.upload_date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => handleDownloadClick(item.id, item.file_url)}
                        className="inline-flex items-center gap-2 bg-brand-primary text-white px-4 py-2 rounded font-bold hover:bg-brand-accent transition-colors"
                      >
                        <DownloadIcon className="w-4 h-4" /> Download
                      </button>
                      <p className="text-xs text-gray-400 mt-2">{item.download_count} downloads</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded border border-border-subtle shadow-sm">
            <p className="text-text-secondary text-lg">No downloads available at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Downloads;
