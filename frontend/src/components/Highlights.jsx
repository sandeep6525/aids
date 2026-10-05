import React from 'react';
import { BookOpen, Lightbulb, Users, Award, Laptop, Rocket } from 'lucide-react';

const Highlights = () => {
  const highlights = [
    {
      title: 'Quality Education',
      description: 'Strong academic foundation with practical approach.',
      icon: <BookOpen className="w-8 h-8 text-brand-accent" />,
    },
    {
      title: 'Research & Innovation',
      description: 'Solving real-world problems through advanced AI research.',
      icon: <Lightbulb className="w-8 h-8 text-brand-accent" />,
    },
    {
      title: 'Industry Collaboration',
      description: 'Bridging academia and industry with top-tier partnerships.',
      icon: <Users className="w-8 h-8 text-brand-accent" />,
    },
    {
      title: 'Student Success',
      description: 'Excellent placement opportunities and startup incubation.',
      icon: <Award className="w-8 h-8 text-brand-accent" />,
    },
    {
      title: 'Modern AI Labs',
      description: 'High-performance computing and state-of-the-art facilities.',
      icon: <Laptop className="w-8 h-8 text-brand-accent" />,
    },
    {
      title: 'Innovation Hub',
      description: 'Nurturing student-led startups and next-gen tech solutions.',
      icon: <Rocket className="w-8 h-8 text-brand-accent" />,
    }
  ];

  return (
    <div className="py-16 bg-white border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {highlights.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-bg-main flex items-center justify-center border border-border-subtle">
                {item.icon}
              </div>
              <div>
                <h4 className="text-lg font-bold text-brand-primary mb-2">{item.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
