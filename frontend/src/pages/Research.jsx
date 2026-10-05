import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { FileText, ExternalLink, Calendar } from 'lucide-react';

const Research = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const response = await api.get('/research');
        if (response.data.success) {
          setPublications(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch research', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResearch();
  }, []);

  return (
    <div className="bg-bg-main min-h-screen pb-20">
      <div className="bg-white py-16 md:py-24 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <p className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-3">Pushing Boundaries</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6 leading-tight">Research & Innovation</h1>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Exploring the frontiers of Artificial Intelligence through high-impact research, pioneering studies, and collaborative publications by our distinguished faculty and researchers.
              </p>
              <div className="w-24 h-1 bg-brand-accent"></div>
            </div>
            <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Research Papers" 
                  className="rounded-lg shadow-md h-48 w-full object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Data Science" 
                  className="rounded-lg shadow-md h-48 w-full object-cover mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {loading ? (
          <div className="bg-white p-12 text-center rounded border border-border-subtle shadow-sm">
            <p className="text-brand-primary font-bold">Loading publications...</p>
          </div>
        ) : publications.length > 0 ? (
          <div className="space-y-6">
            {publications.map((pub) => (
              <div key={pub.id} className="bg-white rounded p-6 shadow-sm border border-border-subtle hover:border-brand-accent transition-colors">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                      <span className="bg-bg-main text-brand-primary px-2 py-1 rounded text-xs font-bold uppercase border border-border-subtle">
                        {pub.research_area.replace(/_/g, ' ')}
                      </span>
                      {pub.publication_date && (
                        <span className="text-gray-500 text-sm flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(pub.publication_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-brand-primary mb-2">{pub.title}</h3>
                    <p className="text-brand-accent font-semibold text-sm mb-1">{pub.authors}</p>
                    <p className="text-gray-600 text-sm italic mb-4">{pub.journal_conference}</p>
                    
                    {pub.abstract && (
                      <div className="mb-4">
                        <p className="text-text-secondary text-sm leading-relaxed">{pub.abstract}</p>
                      </div>
                    )}

                    <div className="flex gap-4 mt-4 pt-4 border-t border-border-subtle">
                      {pub.pdf_url && (
                        <a href={pub.pdf_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-bold text-brand-primary hover:text-brand-accent transition-colors">
                          <FileText className="w-4 h-4 mr-1" /> Download PDF
                        </a>
                      )}
                      {pub.external_url && (
                        <a href={pub.external_url} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-bold text-brand-primary hover:text-brand-accent transition-colors">
                          <ExternalLink className="w-4 h-4 mr-1" /> View Online
                        </a>
                      )}
                      {pub.doi && (
                        <span className="text-gray-400 text-sm ml-auto font-mono">DOI: {pub.doi}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded border border-border-subtle shadow-sm">
            <p className="text-text-secondary text-lg">No research publications found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Research;
