import React from 'react';
import { Target, Flag, Zap, Users, Laptop, Briefcase, Microscope } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-bg-main py-16 md:py-24 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <p className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-3">About Our Department</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6 leading-tight">Department of Artificial Intelligence</h1>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                We are dedicated to pioneering research and delivering world-class education in AI, Machine Learning, and Data Science. Our mission is to cultivate innovators who will shape the future of technology.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#vision" className="btn-primary px-6 py-3 rounded">Our Vision</a>
                <a href="#infrastructure" className="btn-outline px-6 py-3 rounded">View Infrastructure</a>
              </div>
            </div>
            <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="absolute -inset-4 bg-brand-primary/5 rounded-xl transform -rotate-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Department Building" 
                className="relative rounded-xl shadow-xl w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-2">Introduction</h2>
            <h3 className="text-3xl font-bold text-brand-primary mb-6">Department of Artificial Intelligence</h3>
            <div className="prose text-text-secondary text-lg leading-relaxed">
              <p className="mb-4">
                The Department of Artificial Intelligence is committed to imparting quality education, fostering research and innovation, and developing ready professionals to meet the evolving needs of industry and society.
              </p>
              <p>
                Established with the vision of creating a center of excellence in AI, the department offers a comprehensive curriculum that blends strong theoretical foundations with intensive practical training in cutting-edge technologies.
              </p>
            </div>
          </div>
          <div className="rounded overflow-hidden shadow-lg border border-border-subtle">
            <img 
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Department Building" 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Vision, Mission, Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-bg-main p-8 border border-border-subtle rounded card-hover relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent"></div>
            <Target className="w-10 h-10 text-brand-accent mb-6" />
            <h4 className="text-xl font-bold text-brand-primary mb-4">Vision</h4>
            <p className="text-text-secondary leading-relaxed">
              To be a center of excellence in Artificial Intelligence education and research, producing global leaders and innovators.
            </p>
          </div>
          <div className="bg-bg-main p-8 border border-border-subtle rounded card-hover relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent"></div>
            <Flag className="w-10 h-10 text-brand-accent mb-6" />
            <h4 className="text-xl font-bold text-brand-primary mb-4">Mission</h4>
            <p className="text-text-secondary leading-relaxed">
              To impart knowledge, foster innovation and develop skilled professionals ready to solve real-world challenges using AI.
            </p>
          </div>
          <div className="bg-bg-main p-8 border border-border-subtle rounded card-hover relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-accent"></div>
            <Zap className="w-10 h-10 text-brand-accent mb-6" />
            <h4 className="text-xl font-bold text-brand-primary mb-4">Objectives</h4>
            <p className="text-text-secondary leading-relaxed">
              To create real-world impact through research, collaboration and continuous learning in emerging technologies.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-brand-primary mb-4">Why Choose AI Department?</h3>
            <div className="w-24 h-1 bg-brand-accent mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 border border-border-subtle rounded card-hover group">
              <Users className="w-12 h-12 text-brand-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h5 className="font-bold text-brand-primary">Experienced Faculty</h5>
            </div>
            <div className="p-6 border border-border-subtle rounded card-hover group">
              <Laptop className="w-12 h-12 text-brand-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h5 className="font-bold text-brand-primary">Modern Labs</h5>
            </div>
            <div className="p-6 border border-border-subtle rounded card-hover group">
              <Briefcase className="w-12 h-12 text-brand-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h5 className="font-bold text-brand-primary">Industry Collaboration</h5>
            </div>
            <div className="p-6 border border-border-subtle rounded card-hover group">
              <Microscope className="w-12 h-12 text-brand-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h5 className="font-bold text-brand-primary">Research Opportunities</h5>
            </div>
          </div>
        </div>

        {/* Infrastructure */}
        <div>
          <div className="mb-10">
            <h3 className="text-3xl font-bold text-brand-primary mb-2">Infrastructure</h3>
            <div className="w-16 h-1 bg-brand-accent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded overflow-hidden shadow-sm border border-border-subtle group cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="AI Lab" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 bg-bg-main">
                <h5 className="font-bold text-brand-primary text-center">AI Lab</h5>
              </div>
            </div>
            <div className="rounded overflow-hidden shadow-sm border border-border-subtle group cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Research Center" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 bg-bg-main">
                <h5 className="font-bold text-brand-primary text-center">Research Center</h5>
              </div>
            </div>
            <div className="rounded overflow-hidden shadow-sm border border-border-subtle group cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Computer Lab" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 bg-bg-main">
                <h5 className="font-bold text-brand-primary text-center">Computer Lab</h5>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
