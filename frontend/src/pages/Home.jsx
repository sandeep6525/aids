import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Highlights from '../components/Highlights';
import StatisticsBar from '../components/StatisticsBar';
import EventCard from '../components/EventCard';
import { fetchUpcomingEvents, api } from '../services/api';
import { Link } from 'react-router-dom';
import { 
  FileText, Mic, Briefcase, GraduationCap, ArrowRight,
  Code2, Database, BrainCircuit, Network, LineChart, Globe,
  Users, Award, Lightbulb, HeartHandshake, BookOpen, Microscope, BookMarked
} from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useSEO({
    title: 'Home',
    description: 'Welcome to the Department of Artificial Intelligence. Discover our programs, research, events, and placements.',
    url: 'https://yourdomain.edu/',
  });
  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  
  // Data for new sections
  const [faculty, setFaculty] = useState([]);
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  
  // Department info
  const [deptInfo, setDeptInfo] = useState({
    hod_name: 'Dr. R. Kumar',
    hod_designation: 'Head of the Department',
    hod_message: 'The Department of Artificial Intelligence strives to provide a dynamic learning environment that blends strong fundamentals with emerging technologies. Our focus is on nurturing research-oriented minds capable of solving complex global challenges.',
    about_department: 'Building strong foundations in artificial intelligence, machine learning, data science and emerging technologies through academic excellence, research and industry collaboration.'
  });

  useEffect(() => {
    const fetchHomeData = async () => {
      // 1. Events
      try {
        const eventsData = await fetchUpcomingEvents();
        if (eventsData.success) {
          const formatted = eventsData.data.map(event => {
            const ed = new Date(event.event_date);
            return {
              id: event.id,
              date: ed.getDate().toString().padStart(2, '0'),
              month: ed.toLocaleString('default', { month: 'short' }).toUpperCase(),
              title: event.title,
              type: event.event_type.replace('_', ' '),
              venue: event.venue,
              time: `${event.start_time || ''} - ${event.end_time || ''}`,
              image: event.poster_url || 'https://via.placeholder.com/800x400'
            };
          });
          setUpcomingEvents(formatted);
        }
      } catch (err) { console.error(err); }
      setLoadingEvents(false);

      // 2. Announcements
      try {
        const annData = await api.get('/announcements');
        if (annData.data.success) {
          setAnnouncements(annData.data.data.map(ann => ({
            id: ann.id,
            date: new Date(ann.announcement_date).toLocaleDateString(),
            title: ann.title,
            icon: ann.category === 'ACADEMIC' ? 'document' : (ann.category === 'EXAM' ? 'lecture' : 'graduation')
          })));
        }
      } catch (err) { console.error(err); }
      setLoadingAnnouncements(false);
      
      // 3. Faculty
      try {
        const facData = await api.get('/faculty');
        if (facData.data.success) {
          setFaculty(facData.data.data.slice(0, 4));
        }
      } catch (err) { console.error(err); }

      // 4. Projects
      try {
        const projData = await api.get('/projects');
        if (projData.data.success) {
          setProjects(projData.data.data.filter(p => p.featured).slice(0, 3));
        }
      } catch (err) { console.error(err); }

      // 5. Dept Settings
      try {
        const settData = await api.get('/website-settings');
        if (settData.data.success) {
          const s = settData.data.data;
          setDeptInfo(prev => ({
            hod_name: s.hod_name || prev.hod_name,
            hod_designation: s.hod_designation || prev.hod_designation,
            hod_message: s.hod_message || prev.hod_message,
            about_department: s.department_description || prev.about_department
          }));
        }
      } catch (err) { console.error(err); }

      // 6. Placements
      try {
        const plData = await api.get('/placements/students');
        if (plData.data.success) {
          setPlacements(plData.data.data.filter(p => p.is_featured).slice(0, 4));
        }
      } catch (err) { console.error(err); }

      // 7. Recruiters
      try {
        const recData = await api.get('/recruiters');
        if (recData.data.success) {
          setRecruiters(recData.data.data.filter(c => c.is_active));
        }
      } catch (err) { console.error(err); }

      // 8. Achievements
      try {
        const achData = await api.get('/achievements');
        if (achData.data.success) {
          setAchievements(achData.data.data.filter(a => a.is_featured).slice(0, 3));
        }
      } catch (err) { console.error(err); }

      // 9. Gallery
      try {
        const galData = await api.get('/gallery/albums');
        if (galData.data.success) {
          setGallery(galData.data.data.slice(0, 4));
        }
      } catch (err) { console.error(err); }

      // 10. Alumni
      try {
        const alumData = await api.get('/alumni');
        if (alumData.data.success) {
          setAlumni(alumData.data.data.filter(a => a.is_featured).slice(0, 4));
        }
      } catch (err) { console.error(err); }
    };

    fetchHomeData();
  }, []);
  
  const getIcon = (type) => {
    switch(type) {
      case 'document': return <FileText className="w-5 h-5 text-brand-accent" />;
      case 'lecture': return <Mic className="w-5 h-5 text-brand-accent" />;
      case 'placement': return <Briefcase className="w-5 h-5 text-brand-accent" />;
      default: return <GraduationCap className="w-5 h-5 text-brand-accent" />;
    }
  };

  const programs = [
    { title: "B.Sc Artificial Intelligence", duration: "3 Years", desc: "Foundations of AI and programming." },
    { title: "B.Sc AI & Data Science", duration: "3 Years", desc: "Data analytics, machine learning." },
    { title: "M.Sc Artificial Intelligence", duration: "2 Years", desc: "Advanced AI, deep learning, NLP." }
  ];

  const labs = [
    { name: "AI & ML Lab", icon: <BrainCircuit className="w-8 h-8 text-brand-accent" /> },
    { name: "Data Science Lab", icon: <Database className="w-8 h-8 text-brand-accent" /> },
    { name: "Computer Vision Lab", icon: <Microscope className="w-8 h-8 text-brand-accent" /> },
    { name: "NLP Lab", icon: <BookMarked className="w-8 h-8 text-brand-accent" /> }
  ];

  return (
    <>
      <Hero />
      
      {/* 3. Quick Department Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-fade-in-up">
            <div>
              <h4 className="text-brand-accent font-bold uppercase tracking-wider mb-2 text-sm">Welcome To</h4>
              <h2 className="section-title">Department of Artificial Intelligence</h2>
              <p className="text-text-secondary text-lg mb-6 leading-relaxed">
                {deptInfo.about_department}
              </p>
              <div className="flex gap-4">
                <Link to="/about" className="btn-primary px-6 py-3 rounded flex items-center">
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link to="/contact" className="btn-outline px-6 py-3 rounded">Contact Us</Link>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Department" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-primary/20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us / Highlights */}
      <Highlights />
      
      {/* 6. Statistics */}
      <StatisticsBar />
      
      {/* 7. Academic Programs */}
      <section className="py-20 bg-bg-main border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h4 className="text-brand-accent font-bold uppercase tracking-wider mb-2 text-sm">Academics</h4>
            <h2 className="section-title">Academic Offerings</h2>
            <p className="section-subtitle mx-auto">Comprehensive degree programs tailored for the AI-driven future.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((prog, idx) => (
              <div key={idx} className="card-hover p-8 rounded-xl animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                <BookOpen className="w-10 h-10 text-brand-accent mb-6" />
                <h3 className="text-xl font-bold text-brand-primary mb-2">{prog.title}</h3>
                <p className="text-sm text-brand-accent font-bold mb-4">{prog.duration} Program</p>
                <p className="text-text-secondary mb-6">{prog.desc}</p>
                <Link to="/academics" className="text-brand-primary font-bold hover:text-brand-accent flex items-center transition-colors">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 8. AI Labs */}
      <section className="py-20 bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h4 className="text-brand-accent font-bold uppercase tracking-wider mb-2 text-sm">Infrastructure</h4>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">Modern AI Learning Environment</h2>
              <p className="text-gray-400 text-lg max-w-2xl">State-of-the-art laboratories equipped with high-performance computing clusters and industry-standard software.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {labs.map((lab, idx) => (
              <div key={idx} className="bg-brand-secondary border border-gray-800 p-8 rounded-xl hover:border-brand-accent/50 transition-colors duration-300 flex flex-col items-center text-center group">
                <div className="bg-brand-primary p-4 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(178,122,18,0.2)]">
                  {lab.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{lab.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Research & 10. Faculty */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Faculty Highlights */}
            <div>
              <div className="flex justify-between items-end mb-8 border-b border-border-subtle pb-4">
                <div>
                  <h4 className="text-brand-accent font-bold uppercase tracking-wider mb-1 text-sm">Our Experts</h4>
                  <h2 className="text-2xl font-bold text-brand-primary mb-0">Featured Faculty</h2>
                </div>
                <Link to="/faculty" className="text-sm font-semibold text-brand-accent hover:text-brand-primary flex items-center">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {faculty.length > 0 ? faculty.map(f => (
                  <div key={f.id} className="flex items-center gap-4 card-hover p-4 rounded-lg">
                    <img src={f.photo_url || 'https://via.placeholder.com/150'} alt={f.name} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                    <div>
                      <h3 className="font-bold text-brand-primary text-sm">{f.name}</h3>
                      <p className="text-xs text-brand-accent font-medium mb-1">{f.designation}</p>
                      <p className="text-xs text-text-secondary line-clamp-1">{f.specialization}</p>
                    </div>
                  </div>
                )) : <p className="text-text-secondary">Loading faculty...</p>}
              </div>
            </div>
            
            {/* Research & Innovation */}
            <div>
              <div className="flex justify-between items-end mb-8 border-b border-border-subtle pb-4">
                <div>
                  <h4 className="text-brand-accent font-bold uppercase tracking-wider mb-1 text-sm">Innovation</h4>
                  <h2 className="text-2xl font-bold text-brand-primary mb-0">Research Areas</h2>
                </div>
                <Link to="/research" className="text-sm font-semibold text-brand-accent hover:text-brand-primary flex items-center">
                  View Publications <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-bg-main border border-border-subtle rounded-lg flex items-start gap-4">
                  <BrainCircuit className="w-6 h-6 text-brand-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-brand-primary">Deep Learning & Computer Vision</h3>
                    <p className="text-sm text-text-secondary mt-1">Advancing image recognition, object detection, and autonomous systems.</p>
                  </div>
                </div>
                <div className="p-5 bg-bg-main border border-border-subtle rounded-lg flex items-start gap-4">
                  <BookMarked className="w-6 h-6 text-brand-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-brand-primary">Natural Language Processing</h3>
                    <p className="text-sm text-text-secondary mt-1">Building intelligent conversational agents and LLM applications.</p>
                  </div>
                </div>
                <div className="p-5 bg-bg-main border border-border-subtle rounded-lg flex items-start gap-4">
                  <LineChart className="w-6 h-6 text-brand-accent mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-brand-primary">Predictive Analytics</h3>
                    <p className="text-sm text-text-secondary mt-1">Applying machine learning models to healthcare, finance, and climate data.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Events & Announcements Section */}
      <section className="py-20 bg-bg-main border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Upcoming Events */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-end mb-8 border-b border-border-subtle pb-4">
                <div>
                  <h4 className="text-brand-accent font-bold uppercase tracking-wider mb-1 text-sm">Happenings</h4>
                  <h2 className="text-3xl font-extrabold text-brand-primary mb-0">Upcoming Events</h2>
                </div>
                <Link to="/events" className="text-sm font-semibold text-brand-accent hover:text-brand-primary flex items-center">
                  View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {loadingEvents ? (
                  <p className="text-text-secondary">Loading events...</p>
                ) : upcomingEvents.length > 0 ? (
                  upcomingEvents.slice(0, 2).map(event => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <p className="text-text-secondary">No upcoming events currently.</p>
                )}
              </div>
            </div>

            {/* Announcements */}
            <div className="lg:col-span-1">
              <div className="flex justify-between items-end mb-8 border-b border-border-subtle pb-4">
                <h2 className="text-2xl font-bold text-brand-primary mb-0">Announcements</h2>
                <Link to="/announcements" className="text-sm font-semibold text-brand-accent hover:text-brand-primary">
                  View All
                </Link>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-border-subtle p-6 h-[400px] overflow-y-auto">
                <ul className="divide-y divide-border">
                  {loadingAnnouncements ? (
                    <li className="py-4 text-text-secondary">Loading announcements...</li>
                  ) : announcements.length > 0 ? (
                    announcements.map((ann, idx) => (
                      <li key={ann.id} className={`py-4 ${idx === 0 ? 'pt-0' : ''}`}>
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-10 h-10 rounded-full bg-bg-main flex items-center justify-center">
                              {getIcon(ann.icon)}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-brand-accent mb-1 uppercase tracking-wider">{ann.date}</p>
                            <Link to="/announcements" className="text-sm font-semibold text-brand-primary hover:text-brand-accent transition-colors line-clamp-2">
                              {ann.title}
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="py-4 text-text-secondary">No active announcements.</li>
                  )}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 16. Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h4 className="text-brand-accent font-bold uppercase tracking-wider mb-2 text-sm">Student Work</h4>
              <h2 className="section-title mb-0">Featured AI Projects</h2>
            </div>
            <Link to="/projects" className="btn-outline px-4 py-2 rounded flex items-center">
              View All Projects <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.length > 0 ? projects.map(proj => (
              <div key={proj.id} className="card-hover rounded-xl overflow-hidden flex flex-col">
                <img src={proj.thumbnail_url || 'https://via.placeholder.com/600x400'} alt={proj.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-bold text-brand-accent uppercase tracking-wider mb-2">{proj.category} • {proj.year}</span>
                  <h3 className="text-xl font-bold text-brand-primary mb-3 line-clamp-2">{proj.title}</h3>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">{proj.description}</p>
                  <div className="mt-auto">
                    <Link to={`/projects/${proj.id}`} className="text-brand-primary font-bold hover:text-brand-accent transition-colors flex items-center text-sm">
                      View Project <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            )) : <p className="text-text-secondary">Loading projects...</p>}
          </div>
        </div>
      </section>

      {/* 12. Placements & Recruiters */}
      <section className="py-20 bg-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h4 className="text-brand-accent font-bold uppercase tracking-wider mb-2 text-sm">Career Success</h4>
            <h2 className="section-title">Placements & Corporate Partners</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">Our students are sought after by top technology companies worldwide.</p>
          </div>
          
          {/* Top Placed Students */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {placements.length > 0 ? placements.map(p => (
              <div key={p.id} className="bg-white p-6 rounded-xl shadow-sm border border-border-subtle text-center card-hover">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full overflow-hidden border-2 border-brand-accent/30">
                  <img src={p.photo_url || 'https://via.placeholder.com/150'} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-brand-primary text-lg">{p.name}</h3>
                <p className="text-brand-accent font-semibold text-sm mb-2">{p.company}</p>
                <div className="text-xs text-text-secondary mb-2">{p.role}</div>
                {p.package && <div className="text-xs font-bold bg-green-50 text-green-700 py-1 px-2 rounded inline-block">{p.package} LPA</div>}
              </div>
            )) : <p className="text-text-secondary col-span-4 text-center">Loading placements...</p>}
          </div>

          {/* Recruiters Marquee */}
          {recruiters.length > 0 && (
            <div className="bg-white py-8 rounded-xl border border-border-subtle shadow-sm overflow-hidden">
              <h4 className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Our Top Recruiters</h4>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 px-8">
                {recruiters.map(r => (
                  <img key={r.id} src={r.logo_url || 'https://via.placeholder.com/120x60?text=Company'} alt={r.company_name} className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 13. Student Achievements */}
      <section className="py-20 bg-white border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h4 className="text-brand-accent font-bold uppercase tracking-wider mb-2 text-sm">Excellence</h4>
              <h2 className="section-title mb-0">Student Achievements</h2>
            </div>
            <Link to="/achievements" className="btn-outline px-4 py-2 rounded flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.length > 0 ? achievements.map(ach => (
              <div key={ach.id} className="bg-white rounded-xl shadow-sm border border-border-subtle p-6 card-hover flex flex-col">
                <div className="w-12 h-12 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-brand-primary text-xl mb-2 line-clamp-2">{ach.title}</h3>
                <p className="text-sm font-semibold text-brand-accent mb-4">{ach.student_name} • {ach.competition || ach.organization}</p>
                <p className="text-text-secondary text-sm mb-4 line-clamp-3">{ach.description}</p>
              </div>
            )) : <p className="text-text-secondary col-span-3">Loading achievements...</p>}
          </div>
        </div>
      </section>

      {/* 14. Campus Life / Gallery */}
      <section className="py-20 bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h4 className="text-brand-accent font-bold uppercase tracking-wider mb-2 text-sm">Life at AI Dept</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-0">Campus Gallery</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.length > 0 ? gallery.map(album => (
              <Link to="/gallery" key={album.id} className="group relative overflow-hidden rounded-xl h-48 md:h-64">
                <img src={album.cover_image_url || 'https://via.placeholder.com/400'} alt={album.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-bold text-white text-sm md:text-base truncate">{album.title}</h3>
                </div>
              </Link>
            )) : <p className="text-gray-400 col-span-4 text-center">Loading gallery...</p>}
          </div>
          <div className="text-center mt-10">
            <Link to="/gallery" className="inline-flex items-center text-brand-accent hover:text-white font-bold transition-colors">
              View Complete Gallery <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 15. Alumni Network */}
      <section className="py-20 bg-bg-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h4 className="text-brand-accent font-bold uppercase tracking-wider mb-2 text-sm">Our Legacy</h4>
              <h2 className="section-title mb-0">Alumni Network</h2>
            </div>
            <Link to="/alumni" className="btn-outline px-6 py-2 rounded flex items-center">
              Connect with Alumni
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {alumni.length > 0 ? alumni.map(alum => (
              <div key={alum.id} className="bg-white p-6 rounded-xl shadow-sm border border-border-subtle text-center card-hover">
                <img src={alum.profile_photo_url || 'https://via.placeholder.com/150'} alt={alum.name} className="w-20 h-20 mx-auto rounded-full object-cover mb-4 shadow-md border-2 border-brand-accent/20" />
                <h3 className="font-bold text-brand-primary text-lg">{alum.name}</h3>
                <p className="text-brand-accent text-xs font-bold mb-2">Class of {alum.graduation_year}</p>
                <p className="text-sm font-semibold text-gray-700">{alum.designation}</p>
                <p className="text-xs text-text-secondary mt-1">{alum.company}</p>
              </div>
            )) : <p className="text-text-secondary col-span-4 text-center">Loading alumni...</p>}
          </div>
        </div>
      </section>

      {/* HOD Message (existing style but moved down) */}
      <section className="py-20 bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-secondary rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="h-64 lg:h-auto lg:col-span-1 bg-gray-900">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="HOD" 
                  className="w-full h-full object-cover object-top opacity-90"
                />
              </div>
              <div className="p-8 lg:p-16 lg:col-span-2 flex flex-col justify-center">
                <h4 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">HOD Message</h4>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6 leading-tight">Welcome to the Future of Technology</h2>
                <div className="text-gray-300 mb-8 text-lg italic border-l-4 border-brand-accent pl-6 py-2">
                  <p>"{deptInfo.hod_message}"</p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">{deptInfo.hod_name}</h4>
                  <p className="text-sm text-brand-accent font-bold mt-1">{deptInfo.hod_designation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-bg-main border-t border-border-subtle text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-primary mb-6">Ready to shape the future?</h2>
          <p className="text-lg text-text-secondary mb-10">Join our department and start your journey in the world of Artificial Intelligence, Data Science, and Machine Learning.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/academics" className="btn-primary px-8 py-4 rounded-lg text-lg flex items-center justify-center">
              Explore Programs
            </Link>
            <Link to="/contact" className="bg-white text-brand-primary border-2 border-border-subtle hover:border-brand-accent hover:text-brand-accent font-bold px-8 py-4 rounded-lg text-lg transition-colors flex items-center justify-center">
              Contact Department
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
