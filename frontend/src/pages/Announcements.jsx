import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { FileText, Bell, AlertCircle, Calendar } from 'lucide-react';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await api.get('/announcements');
        if (response.data.success) {
          setAnnouncements(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch announcements', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="bg-bg-main min-h-screen pb-20">
      <div className="bg-white py-16 md:py-24 border-b border-border-subtle text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bg-main border border-brand-accent/30 mb-6">
            <Bell className="w-8 h-8 text-brand-accent animate-bounce" style={{ animationDuration: '2s' }} />
          </div>
          <p className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-3">Notice Board</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6">Announcements</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Stay updated with the latest news, urgent notices, and important academic updates from the Department of Artificial Intelligence.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {loading ? (
          <div className="bg-white p-12 text-center rounded border border-border-subtle shadow-sm">
            <p className="text-brand-primary font-bold">Loading announcements...</p>
          </div>
        ) : announcements.length > 0 ? (
          <div className="space-y-6">
            {announcements.map((item) => (
              <div key={item.id} className={`bg-white rounded p-6 shadow-sm border-l-4 ${item.priority === 'HIGH' ? 'border-red-500' : 'border-brand-accent'} relative`}>
                {item.priority === 'HIGH' && (
                  <span className="absolute top-4 right-4 bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" /> URGENT
                  </span>
                )}
                <div className="flex items-center text-xs font-bold text-gray-500 mb-2">
                  <Calendar className="w-4 h-4 mr-1 text-brand-accent" />
                  {new Date(item.created_at).toLocaleDateString()}
                  <span className="mx-2">•</span>
                  <span className="text-brand-primary uppercase bg-bg-main px-2 py-0.5 rounded">{item.category}</span>
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-3 pr-20">{item.title}</h3>
                <p className="text-text-secondary whitespace-pre-wrap">{item.content}</p>
                {item.attachment_url && (
                  <div className="mt-4 pt-4 border-t border-border-subtle">
                    <a href={item.attachment_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold text-brand-accent hover:text-brand-primary transition-colors">
                      <FileText className="w-4 h-4 mr-2" /> View Attachment
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded border border-border-subtle shadow-sm">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-text-secondary text-lg">No new announcements at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
