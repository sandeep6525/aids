import React from 'react';
import { Users, Award, Briefcase, TrendingUp } from 'lucide-react';

const StatisticsBar = () => {
  const stats = [
    { value: '200+', label: 'Student Projects', icon: <Users className="w-8 h-8 text-brand-accent" /> },
    { value: '150+', label: 'Achievements', icon: <Award className="w-8 h-8 text-brand-accent" /> },
    { value: '30+', label: 'Industry Collaborations', icon: <Briefcase className="w-8 h-8 text-brand-accent" /> },
    { value: '85%', label: 'Placement Rate', icon: <TrendingUp className="w-8 h-8 text-brand-accent" /> },
  ];

  return (
    <div className="bg-brand-primary py-12 border-t-4 border-brand-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-navy-light">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left px-4">
              <div className="flex-shrink-0">
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="text-sm font-medium text-gray-300 mt-1">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsBar;
