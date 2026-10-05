import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { ArrowRight, Trophy, Star, Award, BookOpen, Users, Flag, Calendar } from 'lucide-react';

const Achievements = () => {
  const [filter, setFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get('/achievements');
        if (data.success) {
          setAchievements(data.data);
        } else {
          setError('Failed to load achievements.');
        }
      } catch (err) {
        setError('Unable to load achievements. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  // Filter Data
  const categories = ['All', ...new Set(achievements.map(a => a.category).filter(Boolean))];
  const years = ['All Years', ...new Set(achievements.map(a => new Date(a.achievement_date).getFullYear().toString()).filter(y => y !== 'NaN'))].sort((a, b) => b.localeCompare(a));

  const filteredData = achievements.filter(a => {
    const categoryMatch = filter === 'All' || a.category === filter;
    const yearMatch = yearFilter === 'All Years' || new Date(a.achievement_date).getFullYear().toString() === yearFilter;
    return categoryMatch && yearMatch;
  });

  // Calculate stats
  const totalCount = achievements.length;
  const studentCount = achievements.filter(a => a.category === 'Student').length;
  const facultyCount = achievements.filter(a => a.category === 'Faculty').length;
  const awardCount = achievements.filter(a => a.category === 'Award').length;

  // Find Featured
  const featuredAchievement = achievements.find(a => a.featured) || achievements[0];

  return (
    <div className="bg-bg-main min-h-screen pb-20 font-sans">
      
      {/* 1. HERO - Split Editorial */}
      <section className="bg-white border-b border-border-subtle overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center py-16 lg:py-24 gap-12 lg:gap-20">
            {/* Left Content */}
            <div className="flex-1 w-full animate-fade-in-up z-10">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-brand-accent" />
                <span className="text-xs font-bold text-brand-accent tracking-widest uppercase">Honors • Awards • Excellence</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-primary leading-tight mb-6 tracking-tight">
                Excellence <br/> <span className="text-brand-primary-light">That Inspires</span>
              </h1>
              <p className="text-lg text-text-secondary max-w-xl leading-relaxed mb-8">
                Celebrating the outstanding achievements, research milestones, competitions, and accomplishments of our exceptional students and faculty on the global stage.
              </p>
              <a href="#explore" className="btn-primary px-8 py-3.5 rounded text-brand-primary shadow-lg shadow-gold/20 inline-flex items-center group">
                Explore Achievements
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            {/* Right Visual */}
            <div className="flex-1 w-full relative animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                {featuredAchievement?.image_url ? (
                  <img src={featuredAchievement.image_url} alt="Featured Achievement" className="w-full h-full object-cover" />
                ) : (
                  <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Students celebrating" className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-brand-primary/10"></div>
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -left-6 lg:-left-10 bg-white p-5 rounded-xl shadow-xl border border-border-subtle flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-black text-brand-primary">{totalCount}+</p>
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">Achievements</p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTICS */}
      <section className="bg-brand-primary text-white py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            <div className="text-center px-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="flex justify-center mb-3 text-brand-accent"><Trophy className="w-8 h-8" /></div>
              <p className="text-3xl lg:text-4xl font-extrabold mb-1">{totalCount}+</p>
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Total Honors</p>
            </div>
            <div className="text-center px-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="flex justify-center mb-3 text-brand-accent"><Users className="w-8 h-8" /></div>
              <p className="text-3xl lg:text-4xl font-extrabold mb-1">{studentCount}+</p>
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Student Awards</p>
            </div>
            <div className="text-center px-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="flex justify-center mb-3 text-brand-accent"><Award className="w-8 h-8" /></div>
              <p className="text-3xl lg:text-4xl font-extrabold mb-1">{facultyCount}+</p>
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Faculty Recognitions</p>
            </div>
            <div className="text-center px-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="flex justify-center mb-3 text-brand-accent"><BookOpen className="w-8 h-8" /></div>
              <p className="text-3xl lg:text-4xl font-extrabold mb-1">{awardCount}+</p>
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Research Milestones</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED ACHIEVEMENT */}
      {featuredAchievement && (
        <section className="py-20 bg-bg-main">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl border border-border-subtle overflow-hidden flex flex-col lg:flex-row group animate-fade-in-up">
              <div className="lg:w-1/2 relative h-[300px] lg:h-auto overflow-hidden">
                <img 
                  src={featuredAchievement.image_url || 'https://via.placeholder.com/800x600?text=Featured'} 
                  alt={featuredAchievement.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent lg:bg-none"></div>
                <div className="absolute top-4 left-4 bg-brand-accent text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider shadow">
                  Featured Achievement
                </div>
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white">
                <span className="text-brand-accent font-bold text-sm tracking-widest uppercase mb-3 block">
                  {featuredAchievement.category || 'Highlight'}
                </span>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-brand-primary mb-4 leading-tight">
                  {featuredAchievement.title}
                </h2>
                <div className="flex items-center gap-2 mb-6 text-brand-primary-light font-semibold">
                  <Users className="w-4 h-4 text-brand-accent" />
                  <span>{featuredAchievement.student_name}</span>
                  <span className="mx-2 text-border">•</span>
                  <Calendar className="w-4 h-4 text-brand-accent" />
                  <span>{new Date(featuredAchievement.achievement_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}</span>
                </div>
                <p className="text-text-secondary leading-relaxed mb-8 line-clamp-3">
                  {featuredAchievement.description}
                </p>
                <div>
                  <Link to={`/achievements/${featuredAchievement.id}`} className="btn-outline px-6 py-3 rounded inline-flex items-center group/btn hover:bg-brand-primary hover:text-white border-navy/20">
                    Read Full Story
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. EXPLORE ACHIEVEMENTS & FILTERS */}
      <section id="explore" className="pt-20 pb-8 bg-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-border-subtle gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-brand-primary mb-2">Explore Achievements</h2>
              <p className="text-text-secondary text-lg">Browse our complete history of excellence.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <select 
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="bg-white border border-border-subtle text-brand-primary text-sm font-semibold rounded-lg focus:ring-gold focus:border-brand-accent block p-2.5 shadow-sm"
              >
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* Horizontal scrollable chips */}
          <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border ${
                  filter === f 
                    ? 'bg-brand-accent border-brand-accent text-white shadow-md' 
                    : 'bg-white border-border-subtle text-brand-primary hover:border-brand-accent/50 hover:bg-bg-main shadow-sm'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ACHIEVEMENT GRID */}
      <section className="pb-20 bg-bg-main min-h-[400px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white rounded-xl h-[450px] animate-pulse border border-border-subtle">
                  <div className="h-56 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="space-y-2 pt-4">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 p-12 text-center rounded-xl border border-red-200 shadow-sm max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-red-800 mb-2">Unable to load achievements</h3>
              <p className="text-red-600 mb-6">{error}</p>
              <button onClick={() => window.location.reload()} className="btn-outline border-red-200 text-red-600 hover:bg-red-50 px-6 py-2 rounded">Try Again</button>
            </div>
          ) : filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredData.map((item, index) => (
                <Link 
                  to={`/achievements/${item.id}`} 
                  key={item.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-border-subtle group flex flex-col h-full animate-fade-in-up"
                  style={{ animationDelay: `${(index % 6) * 100}ms` }}
                >
                  {/* Card Image */}
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={item.image_url || 'https://via.placeholder.com/600x400?text=Achievement'} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-brand-primary text-xs font-black px-3 py-1.5 rounded uppercase tracking-wider shadow border border-white/20">
                      {item.category || 'Achievement'}
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 flex-grow flex flex-col bg-white">
                    <h3 className="text-xl font-extrabold text-brand-primary mb-3 line-clamp-2 leading-tight group-hover:text-brand-accent transition-colors">{item.title}</h3>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-bg-main flex items-center justify-center border border-border-subtle">
                        <Users className="w-4 h-4 text-brand-accent" />
                      </div>
                      <span className="text-sm font-bold text-brand-primary-light">{item.student_name}</span>
                    </div>

                    <p className="text-sm text-text-secondary line-clamp-2 mb-6 flex-grow">
                      {item.description}
                    </p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{item.level || 'Level'}</span>
                        <span className="text-sm font-bold text-brand-primary truncate max-w-[120px]">
                          {new Date(item.achievement_date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm font-bold text-brand-accent group-hover:text-brand-primary transition-colors bg-bg-main group-hover:bg-brand-accent/10 px-3 py-1.5 rounded-full">
                        View
                        <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white p-16 text-center rounded-2xl border border-border-subtle shadow-sm max-w-3xl mx-auto animate-fade-in-up">
              <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-brand-accent" />
              </div>
              <h3 className="text-2xl font-bold text-brand-primary mb-3">No achievements yet</h3>
              <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">There are currently no published achievements matching your selected filters.</p>
              <button onClick={() => { setFilter('All'); setYearFilter('All Years'); }} className="btn-outline px-8 py-3 rounded text-brand-primary border-navy/20 hover:border-navy">
                View All Achievements
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 6. TIMELINE / JOURNEY */}
      {filteredData.length > 0 && (
        <section className="py-20 bg-white border-t border-border-subtle">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-brand-primary mb-4">Achievement Journey</h2>
              <p className="text-text-secondary text-lg">A chronological view of our milestones.</p>
            </div>
            
            <div className="relative border-l-2 border-brand-accent/30 ml-4 md:ml-1/2 left-0 md:left-1/2 transform md:-translate-x-1/2">
              {years.filter(y => y !== 'All Years').map((year, yearIndex) => {
                const yearAchievements = achievements.filter(a => new Date(a.achievement_date).getFullYear().toString() === year).slice(0, 3); // Max 3 per year for timeline brevity
                
                if (yearAchievements.length === 0) return null;

                return (
                  <div key={year} className="mb-12 relative animate-fade-in-up">
                    {/* Year Marker */}
                    <div className="absolute -left-[9px] md:-left-3 top-0">
                      <div className="bg-brand-accent w-4 h-4 md:w-6 md:h-6 rounded-full border-4 border-white shadow"></div>
                    </div>
                    <div className="pl-6 md:pl-0 md:w-1/2 md:pr-12 text-left md:text-right relative -top-1.5 md:-left-full">
                      <span className="text-2xl font-black text-brand-primary">{year}</span>
                    </div>

                    {/* Events for this year */}
                    <div className="pl-6 md:pl-12 mt-4 md:mt-[-28px] md:w-1/2 md:ml-auto">
                      <div className="space-y-6">
                        {yearAchievements.map(ach => (
                          <div key={ach.id} className="bg-bg-main p-5 rounded-lg border border-border-subtle shadow-sm hover:shadow-md transition-shadow">
                            <span className="text-xs font-bold text-brand-accent uppercase tracking-wider mb-1 block">{ach.category}</span>
                            <h4 className="text-brand-primary font-bold text-lg mb-1 leading-tight">{ach.title}</h4>
                            <p className="text-sm text-text-secondary">{ach.student_name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7. RECOGNITION CTA */}
      <section className="py-24 bg-brand-primary text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Have an achievement to share?</h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            We are constantly updating our hall of excellence. If you are a student or faculty member with a recent award, publication, or milestone, let us know.
          </p>
          <Link to="/contact" className="btn-primary px-8 py-4 rounded text-brand-primary shadow-xl shadow-gold/20 inline-block font-bold text-lg">
            Contact Department
          </Link>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl bg-brand-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      </section>

    </div>
  );
};

export default Achievements;
