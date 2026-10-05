import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, FileText, Book, BookOpen, Download, 
  ArrowRight, BrainCircuit, Binary, Network, Eye, FileCode2,
  Briefcase, LineChart, Cpu, Code, Lightbulb, CheckCircle2,
  FileCheck
} from 'lucide-react';

const Academics = () => {
  const [activeSem, setActiveSem] = useState('Semester I');
  const [programmes, setProgrammes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Derive semesters dynamically from courses if possible, else default
  const defaultSemesters = ['Semester I', 'Semester II', 'Semester III', 'Semester IV', 'Semester V', 'Semester VI'];
  const activeSyllabus = courses.filter(c => c.semester === activeSem);

  const resources = [
    { title: 'Academic Calendar', desc: 'Important dates, holidays, and exam schedules for the current academic year.', icon: <Calendar className="w-10 h-10 text-brand-accent" /> },
    { title: 'Timetable', desc: 'Detailed class schedules, laboratory timings, and faculty availability.', icon: <Clock className="w-10 h-10 text-brand-accent" /> },
    { title: 'Regulations', desc: 'Rules, grading systems, and code of conduct for students.', icon: <FileText className="w-10 h-10 text-brand-accent" /> },
    { title: 'Question Papers', desc: 'Archive of past examination papers for reference and practice.', icon: <Book className="w-10 h-10 text-brand-accent" /> },
    { title: 'Study Materials', desc: 'Faculty-approved notes, presentations, and reading materials.', icon: <BookOpen className="w-10 h-10 text-brand-accent" /> },
    { title: 'Forms & Downloads', desc: 'Registration, scholarship, and administrative request forms.', icon: <Download className="w-10 h-10 text-brand-accent" /> },
  ];

  const features = [
    { title: 'AI & Machine Learning', icon: <BrainCircuit className="w-8 h-8 text-brand-accent" /> },
    { title: 'Data Science', icon: <Binary className="w-8 h-8 text-brand-accent" /> },
    { title: 'Deep Learning', icon: <Network className="w-8 h-8 text-brand-accent" /> },
    { title: 'Computer Vision', icon: <Eye className="w-8 h-8 text-brand-accent" /> },
    { title: 'Natural Language Processing', icon: <FileCode2 className="w-8 h-8 text-brand-accent" /> },
    { title: 'Industry Projects', icon: <Briefcase className="w-8 h-8 text-brand-accent" /> },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progRes, coursesRes] = await Promise.all([
          api.get('/academics/programmes'),
          api.get('/academics/courses')
        ]);
        if (progRes.data.success) setProgrammes(progRes.data.data);
        if (coursesRes.data.success) setCourses(coursesRes.data.data);
      } catch (error) {
        console.error('Failed to fetch academics data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate syllabus stats safely based on dynamic data
  const totalCourses = activeSyllabus.length;
  const coreCourses = activeSyllabus.filter(c => c.type === 'Core' || c.type === 'Lab').length;
  const totalCredits = activeSyllabus.reduce((acc, curr) => acc + parseInt(curr.credits || 0, 10), 0);

  return (
    <div className="bg-bg-main min-h-screen font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION (Light Premium) */}
      <section className="bg-bg-main relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 border-b border-border-subtle">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left Content (55%) */}
            <div className="w-full lg:w-[55%] animate-fade-in-up">
              <span className="inline-block text-xs font-black tracking-widest text-brand-accent uppercase mb-5">
                ACADEMIC EXCELLENCE
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-primary leading-[1.15] mb-6 tracking-tight">
                Shape Your Future <br className="hidden md:block"/> in Artificial Intelligence
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl leading-relaxed">
                Explore our academic programmes, curriculum, practical learning opportunities and resources designed to prepare students for the future of artificial intelligence.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#programmes" className="btn-primary px-8 py-4 rounded text-white shadow-lg shadow-gold/20 font-bold text-sm md:text-base hover:bg-brand-accent-light transition-all">Explore Programmes</a>
                <a href="#curriculum" className="btn-outline px-8 py-4 rounded text-brand-primary border-navy hover:bg-brand-primary hover:text-white shadow-sm font-bold text-sm md:text-base transition-colors">View Curriculum</a>
              </div>
            </div>

            {/* Right Visual (45%) */}
            <div className="w-full lg:w-[45%] relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="relative h-[350px] md:h-[450px] lg:h-[500px] rounded-[24px] overflow-hidden shadow-2xl border border-white/50">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Students collaborating" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Overlapping small image */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl border-8 border-cream overflow-hidden shadow-xl hidden md:block">
                <img 
                  src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Code on screen" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Card */}
              <div className="absolute top-10 -right-4 lg:-right-8 bg-white/90 backdrop-blur-md border border-border-subtle p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce-slow">
                <div className="bg-brand-accent/10 p-2.5 rounded-lg text-brand-accent"><Cpu className="w-6 h-6" /></div>
                <div>
                  <p className="text-brand-primary font-extrabold text-sm leading-tight uppercase tracking-wide">INDUSTRY-ALIGNED</p>
                  <p className="text-brand-accent font-bold text-xs uppercase tracking-wider">LEARNING</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ACADEMIC JOURNEY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="w-full lg:w-4/12 animate-fade-in-up">
              <span className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-3 block">Academic Journey</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-primary leading-tight mb-6">Learn. Build. Research. Innovate.</h2>
              <p className="text-lg text-gray-500 leading-relaxed">
                Our approach to education integrates deep theoretical understanding with continuous hands-on application. We empower students to tackle complex challenges.
              </p>
            </div>
            
            <div className="w-full lg:w-8/12 grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="p-8 rounded-2xl bg-white border border-border-subtle shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <span className="text-6xl font-black text-gray-50 absolute -top-4 -right-4 transition-transform group-hover:scale-110">01</span>
                <div className="relative z-10">
                  <BookOpen className="w-8 h-8 text-brand-accent mb-5" />
                  <h3 className="text-xl font-bold text-brand-primary mb-3">Strong Foundations</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Rigorous coursework in mathematics, algorithms, and core computer science principles.</p>
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-white border border-border-subtle shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <span className="text-6xl font-black text-gray-50 absolute -top-4 -right-4 transition-transform group-hover:scale-110">02</span>
                <div className="relative z-10">
                  <Code className="w-8 h-8 text-brand-accent mb-5" />
                  <h3 className="text-xl font-bold text-brand-primary mb-3">Practical Learning</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Extensive laboratory work, coding assignments, and real-world project development.</p>
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-white border border-border-subtle shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <span className="text-6xl font-black text-gray-50 absolute -top-4 -right-4 transition-transform group-hover:scale-110">03</span>
                <div className="relative z-10">
                  <Lightbulb className="w-8 h-8 text-brand-accent mb-5" />
                  <h3 className="text-xl font-bold text-brand-primary mb-3">Research & Innovation</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Opportunities to work alongside faculty on cutting-edge AI and ML research papers.</p>
                </div>
              </div>
              <div className="p-8 rounded-2xl bg-white border border-border-subtle shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <span className="text-6xl font-black text-gray-50 absolute -top-4 -right-4 transition-transform group-hover:scale-110">04</span>
                <div className="relative z-10">
                  <Briefcase className="w-8 h-8 text-brand-accent mb-5" />
                  <h3 className="text-xl font-bold text-brand-primary mb-3">Industry Exposure</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Internships, industry-sponsored projects, and regular guest lectures from tech experts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAMMES OFFERED */}
      <section id="programmes" className="py-24 bg-bg-main border-t border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4">Programmes Offered</h2>
            <p className="text-lg text-gray-600">
              Academic programmes designed to build strong foundations and practical expertise in AI and emerging technologies.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-brand-primary font-bold animate-pulse">Loading programmes...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {programmes.map((prog, index) => (
                <div key={prog.id} className="bg-white rounded-2xl border border-border-subtle shadow-sm p-8 flex flex-col group hover:-translate-y-1 hover:shadow-xl hover:border-brand-accent/30 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-bg-main rounded-xl flex items-center justify-center text-brand-accent border border-border-subtle">
                      <BookOpen className="w-7 h-7" />
                    </div>
                    <span className="bg-brand-primary/5 text-brand-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">Undergraduate Degree</span>
                  </div>
                  
                  <h3 className="text-2xl font-extrabold text-brand-primary mb-2">{prog.title}</h3>
                  <p className="text-sm font-bold text-brand-accent uppercase tracking-wider mb-4">{prog.duration}</p>
                  <p className="text-gray-600 leading-relaxed mb-8 flex-grow">{prog.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Machine Learning', 'Data Science', 'Neural Networks'].map(tag => (
                      <span key={tag} className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>

                  <a href="#curriculum" className="inline-flex items-center text-sm font-bold text-brand-primary group-hover:text-brand-accent transition-colors pt-4 border-t border-border-subtle mt-auto">
                    View Programme Details
                    <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. WHY STUDY AI */}
      <section className="py-24 bg-white border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-3 block">Future-Ready</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-16">Why Study Artificial Intelligence?</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {features.map((feat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-6 border border-border-subtle rounded-xl bg-white hover:border-brand-accent/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up shadow-sm" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="mb-4 bg-bg-main p-4 rounded-full">{feat.icon}</div>
                <h3 className="text-sm font-bold text-brand-primary leading-tight">{feat.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR LEARNING MODEL */}
      <section className="py-24 bg-bg-main text-brand-primary overflow-hidden relative border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Our Learning Model</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A structured path designed to transform absolute beginners into capable AI professionals.</p>
          </div>

          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden md:block absolute top-8 left-12 right-12 h-[2px] bg-border"></div>

            <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
              {[
                { n: '01', t: 'Foundation', d: 'Mathematics & Coding' },
                { n: '02', t: 'Core AI', d: 'Algorithms & Models' },
                { n: '03', t: 'Practical Labs', d: 'Hands-on Implementation' },
                { n: '04', t: 'Industry Projects', d: 'Real-world Solutions' },
                { n: '05', t: 'Research', d: 'Innovation & Papers' }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center w-full md:w-1/5 relative group bg-white md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none border md:border-none border-border-subtle">
                  {/* Mobile connecting line */}
                  {idx !== 4 && <div className="md:hidden absolute top-14 left-8 w-[2px] h-full bg-border -z-10"></div>}
                  
                  <div className="w-16 h-16 rounded-full bg-white border-[3px] border-brand-accent text-brand-accent flex items-center justify-center text-xl font-black shadow-md z-10 flex-shrink-0 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                    {step.n}
                  </div>
                  <div className="ml-6 md:ml-0 md:mt-6">
                    <h3 className="text-lg font-bold text-brand-primary mb-1">{step.t}</h3>
                    <p className="text-sm text-gray-500 font-medium">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. SYLLABUS & CURRICULUM */}
      <section id="curriculum" className="py-24 bg-white border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4">Syllabus & Curriculum</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              A comprehensive breakdown of courses across all semesters. Select a semester to view the active academic curriculum.
            </p>
          </div>
          
          <div className="flex flex-col xl:flex-row gap-8">
            <div className="xl:w-3/4 order-2 xl:order-1">
              {/* Semester Tabs */}
              <div className="flex overflow-x-auto border-b-2 border-border-subtle mb-6 scrollbar-hide">
                {defaultSemesters.map(sem => (
                  <button
                    key={sem}
                    onClick={() => setActiveSem(sem)}
                    className={`whitespace-nowrap py-3.5 px-6 font-bold text-sm transition-colors border-b-2 -mb-[2px] ${
                      activeSem === sem 
                        ? 'border-brand-accent text-brand-primary bg-brand-accent/5' 
                        : 'border-transparent text-gray-500 hover:text-brand-primary hover:bg-gray-50'
                    }`}
                  >
                    {sem}
                  </button>
                ))}
              </div>

              {/* Desktop Table (hidden on mobile) */}
              <div className="hidden md:block bg-white border border-border-subtle rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-4 text-left text-xs font-black text-brand-primary uppercase tracking-wider">Code</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-brand-primary uppercase tracking-wider">Course Title</th>
                        <th className="px-6 py-4 text-left text-xs font-black text-brand-primary uppercase tracking-wider">Type</th>
                        <th className="px-6 py-4 text-center text-xs font-black text-brand-primary uppercase tracking-wider">Credits</th>
                        <th className="px-6 py-4 text-right text-xs font-black text-brand-primary uppercase tracking-wider">Resource</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#E8E8E8]">
                      {activeSyllabus.length > 0 ? activeSyllabus.map((course, idx) => (
                        <tr key={idx} className="hover:bg-bg-main transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500">{course.code}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brand-primary">{course.course}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs font-semibold">{course.type}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-brand-primary">{course.credits}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                            {course.pdf_url ? (
                              <a href={course.pdf_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-brand-accent opacity-100 transition-opacity hover:text-brand-primary">
                                <FileCheck className="w-4 h-4 mr-1.5" /> PDF
                              </a>
                            ) : (
                              <span className="text-xs text-gray-400">N/A</span>
                            )}
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-16 text-center">
                            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium">Syllabus content not uploaded for this semester yet.</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards (hidden on desktop) */}
              <div className="md:hidden space-y-4">
                 {activeSyllabus.length > 0 ? activeSyllabus.map((course, idx) => (
                    <div key={idx} className="bg-white border border-border-subtle rounded-xl p-5 shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-bold text-brand-accent tracking-wider">{course.code}</span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{course.type}</span>
                      </div>
                      <h3 className="font-bold text-brand-primary mb-4 text-lg leading-tight">{course.course}</h3>
                      <div className="flex justify-between items-center pt-3 border-t border-border-subtle">
                        <span className="text-sm font-semibold text-gray-600">{course.credits} Credits</span>
                        {course.pdf_url && (
                           <a href={course.pdf_url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-brand-primary flex items-center">
                             View PDF <ArrowRight className="w-4 h-4 ml-1 text-brand-accent" />
                           </a>
                        )}
                      </div>
                    </div>
                 )) : (
                    <div className="bg-bg-main border border-border-subtle rounded-xl p-8 text-center">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 font-medium">No courses available.</p>
                    </div>
                 )}
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="xl:w-1/4 order-1 xl:order-2">
              <div className="bg-bg-main border border-border-subtle rounded-xl p-6 shadow-sm sticky top-28">
                <h3 className="text-xl font-bold text-brand-primary mb-6 border-b border-border-subtle pb-4">Curriculum Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium text-sm">Total Courses</span>
                    <span className="font-bold text-brand-primary text-lg">{totalCourses}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium text-sm">Core Courses</span>
                    <span className="font-bold text-brand-primary text-lg">{coreCourses}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium text-sm">Elective Courses</span>
                    <span className="font-bold text-brand-primary text-lg">{totalCourses - coreCourses}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border-subtle">
                    <span className="text-brand-primary font-black text-lg">Total Credits</span>
                    <span className="font-black text-2xl text-brand-accent">{totalCredits}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ACADEMIC RESOURCES */}
      <section className="py-24 bg-bg-main border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4">Academic Resources</h2>
            <p className="text-lg text-gray-600">Essential documents, calendars, and materials to support your academic journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res, index) => (
              <a 
                key={index} 
                href="/downloads" 
                className="flex p-6 border border-border-subtle rounded-2xl bg-white hover:border-brand-accent/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up" 
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex-shrink-0 mr-5 group-hover:scale-110 transition-transform">
                  <div className="bg-bg-main p-4 rounded-xl shadow-sm border border-border-subtle">{res.icon}</div>
                </div>
                <div className="flex flex-col justify-center flex-grow">
                  <h3 className="text-lg font-bold text-brand-primary mb-1">{res.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{res.desc}</p>
                  <div className="mt-auto inline-flex items-center text-xs font-bold text-brand-accent group-hover:text-brand-primary transition-colors uppercase tracking-widest">
                    View / Download <ArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 8. LEARNING BEYOND THE CLASSROOM */}
      <section className="py-24 bg-white border-b border-border-subtle overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border-[6px] border-cream">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Practical Learning" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <span className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-3 block">Applied Knowledge</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-6 leading-tight">From Theory to <br/>Real-World AI</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our state-of-the-art laboratories provide the perfect environment for students to apply theoretical concepts to complex real-world problems.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {['AI Labs', 'Projects', 'Hackathons', 'Workshops', 'Internships', 'Industry Exposure'].map((item, i) => (
                  <li key={i} className="flex items-center text-brand-primary font-bold">
                    <CheckCircle2 className="w-5 h-5 text-brand-accent mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/projects" className="btn-outline px-8 py-3.5 rounded inline-flex items-center group font-bold border-border-subtle shadow-sm hover:bg-bg-main hover:border-brand-accent">
                Explore Projects
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform text-brand-accent" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. RESEARCH & INNOVATION */}
      <section className="py-24 bg-bg-main border-b border-border-subtle text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
           <BookOpen className="w-12 h-12 text-brand-accent mx-auto mb-6" />
           <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-6">Research & Innovation</h2>
           <p className="text-lg text-gray-600 mb-10">
             Our department fosters a strong culture of research, encouraging students and faculty to push the boundaries of AI, publish in top journals, and develop patents.
           </p>
           <Link to="/research" className="btn-primary px-8 py-3.5 rounded inline-flex items-center group font-bold shadow-md">
             Explore Research <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </section>

      {/* 10. FROM CLASSROOM TO CAREER */}
      <section className="py-24 bg-white text-center border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
          <span className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-3 block">Career Pathways</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-primary mb-12">From Classroom to Career</h2>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
            {['AI Engineer', 'Machine Learning Engineer', 'Data Scientist', 'Data Analyst', 'AI Researcher', 'Software Engineer'].map((role, i) => (
              <span key={i} className="bg-bg-main border border-border-subtle px-5 py-2.5 rounded-full text-sm font-bold text-brand-primary shadow-sm hover:border-brand-accent transition-colors cursor-default">
                {role}
              </span>
            ))}
          </div>

          <Link to="/placements" className="text-brand-primary font-extrabold hover:text-brand-accent transition-colors inline-flex items-center uppercase tracking-wider text-sm">
            Explore Placements <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="py-24 bg-brand-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Build Your Future?</h2>
          <p className="text-xl text-gray-300 mb-10">Join our academic programmes and start your journey in Artificial Intelligence.</p>
          <div className="flex flex-wrap justify-center gap-4">
             <a href="#programmes" className="btn-primary px-8 py-4 rounded text-brand-primary font-bold shadow-lg">Explore Programmes</a>
             <Link to="/contact" className="btn-outline px-8 py-4 rounded text-white border-white hover:bg-white hover:text-brand-primary font-bold shadow-lg">Contact Department</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Academics;
