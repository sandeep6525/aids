import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { ArrowLeft, MapPin, Building2, ExternalLink, Briefcase, Calendar, GraduationCap } from 'lucide-react';

const AlumniDetail = () => {
  const { id } = useParams();
  const [alumni, setAlumni] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlumniDetail = async () => {
      try {
        const response = await api.get(`/alumni/${id}`);
        if (response.data.success) {
          setAlumni(response.data.data);
        } else {
          setError('Alumni profile not found.');
        }
      } catch (err) {
        setError('Error loading alumni profile. It may have been removed or is currently under review.');
      } finally {
        setLoading(false);
      }
    };
    fetchAlumniDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-bg-main flex items-center justify-center">
        <div className="text-brand-primary font-bold animate-pulse">Loading profile...</div>
      </div>
    );
  }

  if (error || !alumni) {
    return (
      <div className="min-h-[70vh] bg-bg-main flex items-center justify-center p-4">
        <div className="bg-white p-12 text-center rounded-2xl border border-border-subtle shadow-sm max-w-md w-full">
          <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-brand-primary mb-2">Profile Not Found</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <Link to="/alumni" className="btn-primary px-6 py-2.5 rounded text-white font-bold inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Alumni
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-main min-h-screen pt-24 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <Link to="/alumni" className="inline-flex items-center text-sm font-bold text-brand-primary hover:text-brand-accent transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Alumni Network
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-border-subtle overflow-hidden">
          {/* Header Area */}
          <div className="h-48 md:h-64 bg-gradient-to-r from-navy to-navy-light relative">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
          
          <div className="px-6 md:px-12 pb-12 relative">
            {/* Profile Photo */}
            <div className="absolute -top-24 md:-top-32 left-6 md:left-12">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-8 border-white shadow-lg overflow-hidden bg-white">
                <img 
                  src={alumni.profile_photo_url || 'https://via.placeholder.com/400'} 
                  alt={alumni.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* LinkedIn Button */}
            <div className="flex justify-end pt-6 mb-16 md:mb-6">
              {alumni.linkedin_url && (
                <a 
                  href={alumni.linkedin_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center bg-[#0A66C2] text-white hover:bg-[#004182] px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" /> Connect
                </a>
              )}
            </div>
            
            {/* Main Info */}
            <div className="mt-8 md:mt-16 border-b border-border-subtle pb-8">
              <h1 className="text-3xl md:text-5xl font-extrabold text-brand-primary mb-2 leading-tight">{alumni.name}</h1>
              <p className="text-xl md:text-2xl font-bold text-brand-accent mb-6">{alumni.designation}</p>
              
              <div className="flex flex-wrap gap-y-4 gap-x-8 text-gray-600 font-medium">
                {alumni.company && (
                  <div className="flex items-center"><Building2 className="w-5 h-5 mr-2 text-gray-400" /> {alumni.company}</div>
                )}
                {alumni.location && (
                  <div className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-gray-400" /> {alumni.location}</div>
                )}
                {alumni.graduation_year && (
                  <div className="flex items-center"><Calendar className="w-5 h-5 mr-2 text-gray-400" /> Class of {alumni.graduation_year}</div>
                )}
                {alumni.programme && (
                  <div className="flex items-center"><GraduationCap className="w-5 h-5 mr-2 text-gray-400" /> {alumni.programme}</div>
                )}
              </div>
            </div>

            {/* Bio */}
            {alumni.bio && (
              <div className="pt-8">
                <h2 className="text-lg font-extrabold text-brand-primary uppercase tracking-wider mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-brand-accent" /> Career Journey
                </h2>
                <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
                  {alumni.bio.split('\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniDetail;
