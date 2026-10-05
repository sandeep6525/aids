import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

const Placements = () => {
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const [statsRes, studentsRes] = await Promise.all([
          api.get('/placements/statistics'),
          api.get('/placements/students')
        ]);
        if (statsRes.data.success && statsRes.data.data.length > 0) {
          setStats(statsRes.data.data[0]); // Get most recent year
        }
        if (studentsRes.data.success) {
          setStudents(studentsRes.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch placements', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlacements();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-bg-main min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-white py-20 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-3">Home / Placements</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6 leading-tight">Career & Placements</h1>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Empowering students with industry-ready skills and connecting them with top global tech organizations. Our graduates consistently secure premium roles in AI, Data Science, and Software Engineering.
              </p>
              <div className="flex gap-4">
                <a href="#recruiters" className="btn-primary px-6 py-3 rounded">View Recruiters</a>
                <a href="#students" className="btn-outline px-6 py-3 rounded">Student Stories</a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-brand-accent/10 transform rounded-xl rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Placements" 
                className="relative rounded-xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white p-6 border border-border-subtle rounded text-center shadow-sm">
              <h3 className="text-3xl font-extrabold text-brand-accent mb-1">{stats.placement_percentage}%</h3>
              <p className="text-sm font-medium text-brand-primary uppercase tracking-wider">Placement Rate</p>
            </div>
            <div className="bg-white p-6 border border-border-subtle rounded text-center shadow-sm">
              <h3 className="text-3xl font-extrabold text-brand-accent mb-1">₹{stats.highest_package} L</h3>
              <p className="text-sm font-medium text-brand-primary uppercase tracking-wider">Highest Package</p>
            </div>
            <div className="bg-white p-6 border border-border-subtle rounded text-center shadow-sm">
              <h3 className="text-3xl font-extrabold text-brand-accent mb-1">₹{stats.average_package} L</h3>
              <p className="text-sm font-medium text-brand-primary uppercase tracking-wider">Average Package</p>
            </div>
            <div className="bg-white p-6 border border-border-subtle rounded text-center shadow-sm">
              <h3 className="text-3xl font-extrabold text-brand-accent mb-1">{stats.placed_students}</h3>
              <p className="text-sm font-medium text-brand-primary uppercase tracking-wider">Students Placed</p>
            </div>
          </div>
        )}

        {/* Placed Students */}
        <div className="mb-20">
          <div className="flex justify-between items-end border-b border-border-subtle pb-2 mb-8">
            <h2 className="text-2xl font-bold text-brand-primary">Placed Students</h2>
            <Link to="#" className="text-sm font-bold text-brand-accent hover:text-brand-primary transition-colors">View All &rarr;</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {students.map(student => (
              <div key={student.id} className="bg-white rounded overflow-hidden shadow-sm border border-border-subtle card-hover text-center pb-6">
                <div className="h-48 overflow-hidden bg-gray-100 mb-4">
                  <img src={student.photo_url || 'https://via.placeholder.com/400x400?text=No+Photo'} alt={student.name} className="w-full h-full object-cover object-top" />
                </div>
                <h4 className="text-lg font-bold text-brand-primary">{student.name}</h4>
                <p className="text-xs text-text-secondary mb-3">{student.role}<br/>{student.company}</p>
                <span className="inline-block px-3 py-1 bg-bg-main text-brand-accent font-bold text-sm rounded border border-brand-accent/20">
                  ₹{student.package} LPA
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Recruiting Companies */}
        <div>
          <h2 className="text-2xl font-bold text-brand-primary border-b border-border-subtle pb-2 mb-8">Top Recruiting Companies</h2>
          <div className="bg-white p-8 rounded border border-border-subtle shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center">
              {/* Placeholders for logos */}
              <div className="text-2xl font-bold text-gray-300">Google</div>
              <div className="text-2xl font-bold text-gray-300">Microsoft</div>
              <div className="text-2xl font-bold text-gray-300">Amazon</div>
              <div className="text-2xl font-bold text-gray-300">Infosys</div>
              <div className="text-2xl font-bold text-gray-300">TCS</div>
              <div className="text-2xl font-bold text-gray-300">Accenture</div>
              <div className="text-2xl font-bold text-gray-300">IBM</div>
              <div className="text-2xl font-bold text-gray-300">Wipro</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placements;
