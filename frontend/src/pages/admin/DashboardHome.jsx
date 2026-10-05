import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../services/authApi';
import { useAuth } from '../../context/AuthContext';
import { Users, Calendar, FolderGit2, Award, FileText, MessageSquare } from 'lucide-react';

const DashboardHome = () => {
  const { token, user } = useAuth();
  const [stats, setStats] = useState({
    faculty: 0, events: 0, projects: 0, achievements: 0, publications: 0, messages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await fetchWithAuth('/admin/dashboard', {}, token);
        if (res.success) {
          setStats(res.data);
        }
      } catch (error) {
        console.error('Failed to load dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, [token]);

  const cards = [
    { title: 'Total Faculty', value: stats.faculty, icon: <Users className="w-8 h-8 text-brand-accent" />, bg: 'bg-white' },
    { title: 'Total Events', value: stats.events, icon: <Calendar className="w-8 h-8 text-brand-accent" />, bg: 'bg-white' },
    { title: 'Total Projects', value: stats.projects, icon: <FolderGit2 className="w-8 h-8 text-brand-accent" />, bg: 'bg-white' },
    { title: 'Achievements', value: stats.achievements, icon: <Award className="w-8 h-8 text-brand-accent" />, bg: 'bg-white' },
    { title: 'Publications', value: stats.publications, icon: <FileText className="w-8 h-8 text-brand-accent" />, bg: 'bg-white' },
    { title: 'Messages', value: stats.messages, icon: <MessageSquare className="w-8 h-8 text-brand-accent" />, bg: 'bg-white' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-primary mb-2">Welcome back, {user?.name}</h1>
      <p className="text-text-secondary mb-8">Here is an overview of the department's digital portal.</p>

      {loading ? (
        <p className="text-text-secondary">Loading dashboard statistics...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className={`${card.bg} border border-border-subtle rounded-lg p-6 shadow-sm flex items-center justify-between`}>
              <div>
                <p className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-1">{card.title}</p>
                <p className="text-3xl font-extrabold text-brand-primary">{card.value}</p>
              </div>
              <div className="p-3 bg-bg-main rounded-full border border-brand-accent/20">
                {card.icon}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Activity Logs Placeholder / Recent Activity */}
      {user?.role === 'SUPER_ADMIN' && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-brand-primary mb-4 border-b border-border-subtle pb-2">Recent Activity</h2>
          <div className="bg-white border border-border-subtle rounded-lg shadow-sm p-6">
            <p className="text-text-secondary">Activity logs module will be loaded here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
