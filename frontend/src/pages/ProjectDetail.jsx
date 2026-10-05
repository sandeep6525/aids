import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProjectById } from '../services/api';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      try {
        const data = await fetchProjectById(id);
        if (data.success) {
          setProject(data.data);
        } else {
          setError(data.message || 'Project not found');
        }
      } catch (err) {
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id]);

  if (loading) return (
    <div className="bg-bg-main min-h-screen py-20 flex items-center justify-center">
      <p className="text-xl font-bold text-brand-primary">Loading project details...</p>
    </div>
  );

  if (error || !project) return (
    <div className="bg-bg-main min-h-screen py-20 flex flex-col items-center justify-center">
      <p className="text-xl font-bold text-red-600 mb-4">{error || 'Project not found'}</p>
      <Link to="/projects" className="btn-outline px-6 py-2 rounded">&larr; Back to Projects</Link>
    </div>
  );

  return (
    <div className="bg-bg-main min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/projects" className="text-brand-accent font-bold hover:text-brand-primary inline-flex items-center mb-6">
          &larr; Back to Projects
        </Link>
        <div className="bg-white p-8 rounded shadow border border-border-subtle">
          <div className="mb-4">
            <span className="bg-brand-secondary text-white text-xs font-bold px-3 py-1 rounded">
              {project.category.replace(/_/g, ' ')}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">{project.title}</h1>
          {project.thumbnail_url && (
            <div className="h-64 sm:h-96 w-full rounded mb-8 overflow-hidden border border-border-subtle">
              <img src={project.thumbnail_url} alt={project.title} className="w-full h-full object-cover" />
            </div>
          )}
          
          <div className="mb-8">
            <h3 className="text-xl font-bold text-brand-primary mb-2">Description</h3>
            <p className="text-text-secondary leading-relaxed">{project.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-brand-primary mb-2">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies && project.technologies.split(',').map((tech, idx) => (
                <span key={idx} className="bg-bg-main border border-brand-accent/30 text-brand-primary font-semibold px-3 py-1 rounded">
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>

          {(project.github_url || project.demo_url) && (
            <div className="flex gap-4 pt-6 border-t border-border-subtle">
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noreferrer" className="btn-outline px-6 py-2 rounded font-bold">
                  View Source Code
                </a>
              )}
              {project.demo_url && (
                <a href={project.demo_url} target="_blank" rel="noreferrer" className="btn-primary px-6 py-2 rounded font-bold shadow-sm">
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
