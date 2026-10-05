import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../services/api';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = ['All', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Data Science', 'IoT + AI'];

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const category = filter !== 'All' ? filter.toUpperCase().replace(/ /g, '_').replace('_+_', '_') : 'All';
        const data = await fetchProjects(category);
        if (data.success) {
          setProjects(data.data);
        } else {
          setError(data.message || 'Unable to load projects.');
        }
      } catch (err) {
        setError('Unable to load projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, [filter]);

  return (
    <div className="bg-bg-main min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-bg-main py-16 md:py-24 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 animate-fade-in-up">
              <p className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-3">Our Work</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6">Student Projects & Innovation</h1>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Explore the innovative solutions built by our students. From Machine Learning models to Computer Vision applications, our students are building the next generation of intelligent systems.
              </p>
            </div>
            <div className="flex-1 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <div className="relative">
                <div className="absolute inset-0 bg-brand-accent/10 transform rounded-xl -rotate-2"></div>
                <img 
                  src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Student Projects" 
                  className="relative rounded-xl shadow-xl w-full h-[350px] object-cover"
                />
              </div>
            </div>
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

        {/* Content Area */}
        {loading ? (
          <div className="bg-white p-12 text-center rounded border border-border-subtle shadow-sm">
            <p className="text-brand-primary text-lg font-bold">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-12 text-center rounded border border-red-200 shadow-sm">
            <p className="text-red-600 text-lg font-bold">{error}</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded overflow-hidden shadow-sm border border-border-subtle card-hover flex flex-col md:flex-row h-full">
                <div className="w-full md:w-2/5 h-48 md:h-auto overflow-hidden">
                  <img 
                    src={project.thumbnail_url || 'https://via.placeholder.com/800x800?text=Project'} 
                    alt={project.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <div className="mb-2">
                      <span className="inline-block bg-brand-secondary text-white text-xs font-bold px-2 py-1 rounded">
                        {project.category.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-brand-primary mb-2 line-clamp-2">{project.title}</h3>
                    <p className="text-sm text-text-secondary mb-4 line-clamp-3">{project.description}</p>
                  </div>
                  <div>
                    <div className="flex gap-2 flex-wrap mb-4">
                      {project.technologies && project.technologies.split(',').map((tech, idx) => (
                        <span key={idx} className="text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 px-2 py-1 rounded">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                    <Link to={`/projects/${project.id}`} className="text-sm font-bold text-brand-accent hover:text-brand-primary transition-colors inline-flex items-center">
                      View Details
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded border border-border-subtle shadow-sm">
            <p className="text-text-secondary text-lg">No projects available for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
