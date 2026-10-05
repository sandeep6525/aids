import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { ArrowLeft, Award, Calendar, MapPin, Building, Trophy, ChevronRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const AchievementDetail = () => {
  const { id } = useParams();
  const [achievement, setAchievement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        const { data } = await api.get(`/achievements/${id}`);
        if (data.success) {
          setAchievement(data.data);
          // Fetch related
          const relatedRes = await api.get('/achievements');
          if (relatedRes.data.success) {
            setRelated(relatedRes.data.data.filter(a => a.id !== parseInt(id)).slice(0, 3));
          }
        } else {
          setError('Failed to load achievement.');
        }
      } catch (err) {
        setError('Achievement not found or an error occurred.');
      }
      setLoading(false);
    };
    fetchAchievement();
  }, [id]);

  useSEO({
    title: achievement ? achievement.title : 'Achievement Details',
    description: achievement?.description,
  });

  if (loading) return <div className="flex h-screen items-center justify-center bg-bg-main"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy"></div></div>;
  if (error || !achievement) return (
    <div className="flex flex-col h-screen items-center justify-center bg-bg-main text-center px-4">
      <Trophy className="w-16 h-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold text-brand-primary mb-2">Achievement Not Found</h2>
      <p className="text-text-secondary mb-6">{error}</p>
      <Link to="/achievements" className="btn-primary px-6 py-2 rounded flex items-center">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Achievements
      </Link>
    </div>
  );

  return (
    <div className="bg-bg-main min-h-screen pt-24 pb-20 animate-fade-in-up">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-text-secondary mb-8 overflow-hidden">
          <Link to="/" className="hover:text-brand-accent transition-colors whitespace-nowrap">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <Link to="/achievements" className="hover:text-brand-accent transition-colors whitespace-nowrap">Achievements</Link>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <span className="text-brand-primary font-semibold truncate">{achievement.title}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-border-subtle overflow-hidden mb-10">
          <div className="bg-brand-primary p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none transform translate-x-4 -translate-y-8">
              <Trophy className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-brand-accent text-brand-primary font-bold text-xs uppercase tracking-widest rounded-full mb-6">
                {achievement.category || 'Achievement'}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">{achievement.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-brand-accent mr-2" />
                  <span className="font-semibold text-white">{achievement.student_name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-brand-accent mr-2" />
                  <span>{new Date(achievement.achievement_date).toLocaleDateString()}</span>
                </div>
                {achievement.organization && (
                  <div className="flex items-center">
                    <Building className="w-5 h-5 text-brand-accent mr-2" />
                    <span>{achievement.organization}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {achievement.image_url && (
            <img src={achievement.image_url} alt={achievement.title} className="w-full h-auto max-h-[500px] object-cover" />
          )}

          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-brand-primary mb-6 border-b border-border-subtle pb-4">About This Achievement</h2>
            <div className="prose max-w-none text-text-secondary mb-12">
              <p className="whitespace-pre-wrap leading-relaxed">{achievement.description}</p>
            </div>

            <h2 className="text-xl font-bold text-brand-primary mb-6 border-b border-border-subtle pb-4">Achievement Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-bg-main p-6 rounded-xl border border-border-subtle">
              {achievement.student_register_number && (
                <div>
                  <span className="block text-xs font-bold text-brand-accent uppercase tracking-wider mb-1">Registration No</span>
                  <span className="text-brand-primary font-semibold">{achievement.student_register_number}</span>
                </div>
              )}
              {achievement.competition && (
                <div>
                  <span className="block text-xs font-bold text-brand-accent uppercase tracking-wider mb-1">Competition</span>
                  <span className="text-brand-primary font-semibold">{achievement.competition}</span>
                </div>
              )}
              {achievement.position && (
                <div>
                  <span className="block text-xs font-bold text-brand-accent uppercase tracking-wider mb-1">Position / Level</span>
                  <span className="text-brand-primary font-semibold">{achievement.position}</span>
                </div>
              )}
              {achievement.organization && (
                <div>
                  <span className="block text-xs font-bold text-brand-accent uppercase tracking-wider mb-1">Organization</span>
                  <span className="text-brand-primary font-semibold">{achievement.organization}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Achievements */}
        {related.length > 0 && (
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-brand-primary mb-6">Related Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(rel => (
                <Link to={`/achievements/${rel.id}`} key={rel.id} className="bg-white rounded-xl shadow-sm border border-border-subtle p-6 card-hover flex flex-col group">
                  <div className="w-10 h-10 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-brand-primary mb-2 line-clamp-2">{rel.title}</h4>
                  <p className="text-sm font-semibold text-brand-accent mb-2">{rel.student_name}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/achievements" className="btn-outline px-8 py-3 rounded inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Achievements
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AchievementDetail;
