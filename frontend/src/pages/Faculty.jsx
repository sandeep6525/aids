import React, { useState, useEffect } from 'react';
import { fetchFaculty } from '../services/api';
import { Search } from 'lucide-react';

const Faculty = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = ['All', 'Professor', 'Associate Professor', 'Assistant Professor'];

  useEffect(() => {
    const loadFaculty = async () => {
      setLoading(true);
      setError(null);
      try {
        const designation = filter !== 'All' ? filter : '';
        const data = await fetchFaculty(designation);
        if (data.success) {
          setFacultyList(data.data);
        } else {
          setError(data.message || 'Unable to load faculty information. Please try again.');
        }
      } catch (err) {
        setError('Unable to load faculty information. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadFaculty();
  }, [filter]);

  const filteredFaculty = facultyList.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || 
                          (f.specialization && f.specialization.toLowerCase().includes(search.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="bg-bg-main min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-white py-16 md:py-24 border-b border-border-subtle text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <p className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-3">Our Faculty</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6">Meet the Minds Behind Our Department</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Our distinguished faculty members are leaders in artificial intelligence, bringing years of academic excellence, industry experience, and groundbreaking research to the classroom.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Filters and Search */}
        <div className="bg-white p-4 rounded shadow-md border border-border-subtle flex flex-col lg:flex-row justify-between items-center gap-4 mb-12">
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors border ${
                  filter === f 
                    ? 'bg-brand-accent border-brand-accent text-white shadow' 
                    : 'bg-white border-border-subtle text-brand-primary hover:bg-bg-main'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-72">
            <input 
              type="text" 
              placeholder="Search faculty..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border-subtle rounded focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-brand-accent"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="bg-white p-12 text-center rounded border border-border-subtle shadow-sm">
            <p className="text-brand-primary text-lg font-bold">Loading faculty members...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-12 text-center rounded border border-red-200 shadow-sm">
            <p className="text-red-600 text-lg font-bold">{error}</p>
          </div>
        ) : filteredFaculty.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFaculty.map(faculty => (
              <div key={faculty.id} className="bg-white rounded overflow-hidden shadow-sm border border-border-subtle card-hover group flex flex-col text-center pb-6">
                <div className="h-56 overflow-hidden bg-gray-100">
                  <img 
                    src={faculty.photo_url || 'https://via.placeholder.com/400x400?text=No+Photo'} 
                    alt={faculty.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="px-4 pt-6 flex-grow">
                  <h3 className="text-lg font-bold text-brand-primary mb-1">{faculty.name}</h3>
                  <p className="text-sm font-semibold text-brand-accent mb-3">{faculty.designation}</p>
                  <p className="text-xs text-text-secondary mb-1 line-clamp-1">{faculty.qualification}</p>
                  <p className="text-xs text-text-secondary line-clamp-1">{faculty.specialization}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border-subtle mx-4 flex justify-center gap-4">
                  <a href={faculty.linkedin_url || '#'} className="text-gray-400 hover:text-brand-accent transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-brand-accent transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded border border-border-subtle shadow-sm">
            <p className="text-text-secondary text-lg">No faculty members available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Faculty;
