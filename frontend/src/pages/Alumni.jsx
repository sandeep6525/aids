import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { GraduationCap, MapPin, ExternalLink, ArrowRight, BrainCircuit, Binary, FileCode2, Briefcase, Network, Globe, Plus, X } from 'lucide-react';

const Alumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');
  
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitFormData, setSubmitFormData] = useState({
    name: '', graduation_year: new Date().getFullYear(), programme: 'B.Tech AI & DS',
    company: '', designation: '', location: '', linkedin_url: '', bio: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await api.get('/alumni');
        if (response.data.success) {
          setAlumni(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch alumni', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  const stats = useMemo(() => {
    const uniqueCountries = new Set(alumni.filter(a => a.location).map(a => a.location.split(',').pop().trim()));
    const uniqueCompanies = new Set(alumni.filter(a => a.company).map(a => a.company));
    
    return [
      { label: 'Alumni', value: alumni.length > 50 ? '500+' : `${alumni.length}+` },
      { label: 'Countries', value: uniqueCountries.size > 5 ? '20+' : `${Math.max(uniqueCountries.size, 1)}+` },
      { label: 'Companies', value: uniqueCompanies.size > 10 ? '50+' : `${Math.max(uniqueCompanies.size, 1)}+` },
      { label: 'Industries', value: '10+' }
    ];
  }, [alumni]);

  const uniqueYears = useMemo(() => {
    return [...new Set(alumni.map(a => a.graduation_year))].sort((a, b) => b - a);
  }, [alumni]);

  const filteredAlumni = useMemo(() => {
    return alumni.filter(a => {
      const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (a.company && a.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            (a.designation && a.designation.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesYear = filterYear ? a.graduation_year.toString() === filterYear : true;
      return matchesSearch && matchesYear;
    });
  }, [alumni, searchTerm, filterYear]);

  const handleAlumniSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      await api.post('/alumni/submit', submitFormData);
      setSubmitStatus('success');
      setTimeout(() => {
        setShowSubmitModal(false);
        setSubmitStatus('');
        setSubmitFormData({
          name: '', graduation_year: new Date().getFullYear(), programme: 'B.Tech AI & DS',
          company: '', designation: '', location: '', linkedin_url: '', bio: ''
        });
      }, 3000);
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="bg-bg-main min-h-screen font-sans overflow-hidden">
      
      {/* 1. HERO SECTION (Light Premium) */}
      <section className="bg-white relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 border-b border-border-subtle">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Content (50%) */}
            <div className="w-full lg:w-1/2 animate-fade-in-up">
              <span className="inline-block text-sm font-extrabold tracking-widest text-brand-accent uppercase mb-5">
                OUR ALUMNI NETWORK
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-primary leading-[1.1] mb-6 tracking-tight">
                From Our Classrooms <br className="hidden md:block"/> to the World
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl leading-relaxed font-medium">
                Our alumni continue to create impact across technology, research, entrepreneurship, and industry. Discover the journeys of graduates who are building the future.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#network" className="btn-primary px-8 py-4 rounded-lg text-white shadow-lg shadow-gold/20 font-bold text-sm md:text-base hover:bg-brand-accent-light transition-all">Meet Our Alumni</a>
                <button onClick={() => setShowSubmitModal(true)} className="btn-outline px-8 py-4 rounded-lg text-brand-primary border-border-subtle hover:border-brand-accent hover:text-brand-accent hover:bg-bg-main shadow-sm font-bold text-sm md:text-base transition-colors bg-white">Share Your Journey</button>
              </div>
            </div>

            {/* Right Visual (50%) */}
            <div className="w-full lg:w-1/2 relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="relative h-[400px] lg:h-[550px] rounded-[32px] overflow-hidden shadow-2xl border-8 border-white bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Alumni Professionals" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlapping small image */}
              <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-3xl border-[12px] border-white overflow-hidden shadow-xl hidden md:block bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Alumni Collaboration" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Card */}
              <div className="absolute top-12 -right-6 lg:-right-8 bg-white/90 backdrop-blur-md border border-border-subtle p-5 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow">
                <div className="bg-brand-accent/10 p-3 rounded-xl text-brand-accent"><Globe className="w-6 h-6" /></div>
                <div>
                  <p className="text-brand-primary font-extrabold text-sm leading-tight uppercase tracking-wide">ALUMNI NETWORK</p>
                  <p className="text-gray-500 font-medium text-xs">Connecting innovators</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ALUMNI STATISTICS */}
      <section className="bg-white border-b border-border-subtle py-12 relative z-20 shadow-sm -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-border">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <p className="text-4xl md:text-5xl font-black text-brand-primary mb-1">{stat.value}</p>
                <p className="text-sm font-bold text-brand-accent uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BEYOND GRADUATION */}
      <section className="py-24 bg-bg-main border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 animate-fade-in-up">
              <div className="aspect-square md:aspect-video lg:aspect-square rounded-[32px] overflow-hidden shadow-xl border border-white">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Mentorship and Networking" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-accent rounded-full hidden md:block"></div>
              <div className="md:pl-10">
                <span className="text-sm font-black text-brand-accent tracking-widest uppercase mb-4 block">BEYOND GRADUATION</span>
                <h2 className="text-3xl md:text-5xl font-black text-brand-primary leading-tight mb-6">Learning Doesn't End at Graduation.</h2>
                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                  We remain deeply connected with our graduates. Through ongoing mentorship, industry interactions, alumni events, and collaborative research, our department ensures that the learning journey continues well past the classroom. 
                </p>
                <p className="text-lg text-gray-600 leading-relaxed font-medium mt-4">
                  Our alumni network is a powerful community of innovators, founders, and leaders who actively give back to guide the next generation of students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MEET OUR ALUMNI (GRID + FILTERS) */}
      <section id="network" className="py-24 bg-white border-b border-border-subtle min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-black text-brand-primary mb-4">Meet Our Alumni</h2>
            <p className="text-lg text-gray-500 font-medium">
              Discover the people carrying the department's learning and values into the world.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="bg-bg-main p-4 md:p-6 rounded-2xl border border-border-subtle flex flex-col md:flex-row gap-4 mb-12 shadow-sm animate-fade-in-up">
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Search by name, role, or company..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-gold bg-white text-brand-primary font-medium"
              />
            </div>
            <div className="w-full md:w-64">
              <select 
                value={filterYear}
                onChange={e => setFilterYear(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-gold bg-white text-brand-primary font-medium appearance-none cursor-pointer"
              >
                <option value="">All Graduation Years</option>
                {uniqueYears.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-brand-primary font-bold animate-pulse">Loading alumni profiles...</div>
          ) : filteredAlumni.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAlumni.map((alum, idx) => (
                <div key={alum.id} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-border-subtle hover:shadow-xl hover:border-brand-accent/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col animate-fade-in-up" style={{ animationDelay: `${(idx % 6) * 50}ms` }}>
                  
                  {/* Card Header (Photo) */}
                  <div className="relative h-48 bg-bg-main overflow-hidden flex items-end justify-center pb-4 pt-10">
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-border-subtle shadow-sm z-10">
                      <span className="text-xs font-black text-brand-primary uppercase tracking-wider">{alum.graduation_year}</span>
                    </div>
                    <img 
                      src={alum.profile_photo_url || 'https://via.placeholder.com/300'} 
                      alt={alum.name} 
                      className="w-32 h-32 rounded-full border-[6px] border-white shadow-md object-cover z-10 group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent"></div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-8 flex flex-col flex-1 text-center relative">
                    {/* Hover Gold Line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-brand-accent transition-all duration-300 group-hover:w-12 rounded-b-full"></div>
                    
                    <h3 className="text-xl font-extrabold text-brand-primary mb-1 line-clamp-1">{alum.name}</h3>
                    
                    <div className="mb-6 flex-1 mt-2">
                      <p className="text-brand-accent font-bold text-sm mb-1 line-clamp-2">{alum.designation}</p>
                      <p className="text-gray-500 text-sm font-medium line-clamp-1 flex items-center justify-center">
                        {alum.company && <Briefcase className="w-3.5 h-3.5 mr-1.5 opacity-70"/>}
                        {alum.company}
                      </p>
                    </div>
                    
                    <Link to={`/alumni/${alum.id}`} className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-bg-main text-brand-primary font-bold hover:bg-brand-accent hover:text-white transition-colors group/btn mt-auto">
                      View Profile <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-bg-main p-16 text-center rounded-3xl border border-border-subtle shadow-inner max-w-2xl mx-auto">
              <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-brand-primary text-2xl font-black mb-2">Profiles are being updated.</p>
              <p className="text-gray-500 font-medium mb-6">We couldn't find any public alumni records matching your criteria.</p>
              <button onClick={() => setShowSubmitModal(true)} className="btn-primary px-6 py-2.5 rounded-lg text-white font-bold shadow-sm">Be the first to share your journey</button>
            </div>
          )}
        </div>
      </section>

      {/* 5. CAREER JOURNEYS */}
      <section className="py-24 bg-bg-main border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-black text-brand-accent tracking-widest uppercase mb-3 block">CAREER JOURNEYS</span>
          <h2 className="text-3xl md:text-5xl font-black text-brand-primary mb-16">Where Our Alumni Are Making An Impact</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {[
              { title: 'Artificial Intelligence', icon: <BrainCircuit className="w-8 h-8 text-brand-accent" /> },
              { title: 'Software Engineering', icon: <FileCode2 className="w-8 h-8 text-brand-accent" /> },
              { title: 'Data Science', icon: <Binary className="w-8 h-8 text-brand-accent" /> },
              { title: 'Research', icon: <Network className="w-8 h-8 text-brand-accent" /> },
              { title: 'Entrepreneurship', icon: <Globe className="w-8 h-8 text-brand-accent" /> },
              { title: 'Consulting', icon: <Briefcase className="w-8 h-8 text-brand-accent" /> },
            ].map((industry, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-6 md:p-8 border border-border-subtle rounded-2xl bg-white hover:border-brand-accent/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="mb-4 bg-bg-main p-4 rounded-xl border border-border-subtle">{industry.icon}</div>
                <h3 className="text-sm font-extrabold text-brand-primary leading-tight">{industry.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. STAY CONNECTED */}
      <section className="py-24 bg-white text-center border-b border-border-subtle relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up">
          <span className="text-sm font-black text-brand-accent tracking-widest uppercase mb-4 block">STAY CONNECTED</span>
          <h2 className="text-4xl md:text-6xl font-black text-brand-primary mb-6 leading-[1.1]">
            Your Department.<br/>Your Network.<br/>Your Community.
          </h2>
          <p className="text-xl text-gray-500 mb-10 font-medium">Whether you're looking to mentor students, share a career opportunity, or simply stay in touch.</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-4 rounded-lg text-white font-bold shadow-lg shadow-gold/20 flex items-center">
               Connect on LinkedIn <ExternalLink className="w-4 h-4 ml-2" />
             </a>
             <button onClick={() => setShowSubmitModal(true)} className="btn-outline px-8 py-4 rounded-lg text-brand-primary border-border-subtle hover:border-brand-accent hover:bg-bg-main font-bold shadow-sm flex items-center bg-white">
               Share Your Journey <Plus className="w-4 h-4 ml-2" />
             </button>
          </div>
        </div>
      </section>

      {/* SUBMIT ALUMNI MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-brand-primary/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl border border-border-subtle my-8 animate-fade-in-up">
            <div className="flex justify-between items-center p-6 border-b border-border-subtle sticky top-0 bg-white z-10 rounded-t-3xl">
              <div>
                <h3 className="text-2xl font-black text-brand-primary">Share Your Journey</h3>
                <p className="text-sm text-gray-500 font-medium mt-1">Submit your profile to be featured on the Alumni Network.</p>
              </div>
              <button onClick={() => setShowSubmitModal(false)} className="text-gray-400 hover:text-red-500 transition-colors bg-bg-main p-2 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            
            {submitStatus === 'success' ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h4 className="text-2xl font-black text-brand-primary mb-2">Thank You!</h4>
                <p className="text-gray-600 font-medium">Your profile has been submitted and is pending review by the department.</p>
              </div>
            ) : (
              <form onSubmit={handleAlumniSubmit} className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-brand-primary mb-2">Full Name *</label>
                    <input type="text" required value={submitFormData.name} onChange={e => setSubmitFormData({...submitFormData, name: e.target.value})} className="w-full p-3.5 border border-border-subtle rounded-xl focus:outline-none focus:border-brand-accent bg-bg-main/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-primary mb-2">Graduation Year *</label>
                    <input type="number" required min="1990" max={new Date().getFullYear()} value={submitFormData.graduation_year} onChange={e => setSubmitFormData({...submitFormData, graduation_year: e.target.value})} className="w-full p-3.5 border border-border-subtle rounded-xl focus:outline-none focus:border-brand-accent bg-bg-main/50" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-brand-primary mb-2">Programme *</label>
                    <select required value={submitFormData.programme} onChange={e => setSubmitFormData({...submitFormData, programme: e.target.value})} className="w-full p-3.5 border border-border-subtle rounded-xl focus:outline-none focus:border-brand-accent bg-bg-main/50 appearance-none">
                      <option>B.Tech AI & DS</option>
                      <option>M.Tech AI</option>
                      <option>Ph.D.</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-primary mb-2">Current Location *</label>
                    <input type="text" required placeholder="e.g. Bangalore, India" value={submitFormData.location} onChange={e => setSubmitFormData({...submitFormData, location: e.target.value})} className="w-full p-3.5 border border-border-subtle rounded-xl focus:outline-none focus:border-brand-accent bg-bg-main/50" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-brand-primary mb-2">Company / Organization *</label>
                    <input type="text" required value={submitFormData.company} onChange={e => setSubmitFormData({...submitFormData, company: e.target.value})} className="w-full p-3.5 border border-border-subtle rounded-xl focus:outline-none focus:border-brand-accent bg-bg-main/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-primary mb-2">Designation / Role *</label>
                    <input type="text" required value={submitFormData.designation} onChange={e => setSubmitFormData({...submitFormData, designation: e.target.value})} className="w-full p-3.5 border border-border-subtle rounded-xl focus:outline-none focus:border-brand-accent bg-bg-main/50" />
                  </div>
                  
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-brand-primary mb-2">LinkedIn URL</label>
                    <input type="url" placeholder="https://linkedin.com/in/..." value={submitFormData.linkedin_url} onChange={e => setSubmitFormData({...submitFormData, linkedin_url: e.target.value})} className="w-full p-3.5 border border-border-subtle rounded-xl focus:outline-none focus:border-brand-accent bg-bg-main/50" />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-bold text-brand-primary mb-2">Your Career Journey (Bio)</label>
                    <textarea value={submitFormData.bio} onChange={e => setSubmitFormData({...submitFormData, bio: e.target.value})} className="w-full p-3.5 border border-border-subtle rounded-xl focus:outline-none focus:border-brand-accent bg-bg-main/50" rows="4" placeholder="Share a brief summary of what you've been working on since graduation..."></textarea>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-border-subtle mt-8">
                  <button type="button" onClick={() => setShowSubmitModal(false)} className="px-6 py-3 border border-border-subtle rounded-xl text-brand-primary font-bold hover:bg-bg-main transition-colors">Cancel</button>
                  <button type="submit" disabled={submitStatus === 'submitting'} className="px-8 py-3 bg-brand-accent text-white rounded-xl font-bold hover:bg-brand-accent-light transition-colors shadow-sm disabled:opacity-50">
                    {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Profile'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Alumni;
