import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await api.get('/home-slider');
        if (response.data.success && response.data.data.length > 0) {
          setSlides(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching hero slides', error);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 second slides
    return () => clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0) {
    // Fallback if no slides exist
    return (
      <div className="relative bg-brand-primary overflow-hidden border-b border-border-subtle h-[600px] lg:h-[700px] flex items-center">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
            alt="AI Department Campus" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
          <div className="sm:text-center lg:text-left max-w-2xl text-white">
            <span className="inline-flex items-center text-xs font-bold tracking-widest text-brand-accent uppercase mb-4 bg-brand-secondary/80 px-3 py-1 rounded border border-brand-accent/30">
              Empowering the Next Generation of Intelligent Innovators
            </span>
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl mb-6 text-white drop-shadow-md">
              Department of Artificial Intelligence
            </h1>
            <p className="mt-3 text-base sm:mt-5 sm:text-lg md:mt-5 md:text-xl leading-relaxed text-gray-200 drop-shadow">
              Building strong foundations in artificial intelligence, machine learning, data science and emerging technologies through academic excellence, research and industry collaboration.
            </p>
            <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
              <div className="rounded-md shadow-sm">
                <Link to="/academics" className="w-full flex items-center justify-center px-8 py-3.5 border border-transparent text-base rounded btn-primary md:py-4 md:text-lg font-semibold">
                  Explore Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const slide = slides[currentSlideIndex];

  return (
    <div className="relative bg-brand-primary overflow-hidden border-b border-border-subtle h-[600px] lg:h-[700px] group transition-all duration-700">
      
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full">
        {slide.media_type === 'VIDEO' ? (
          <video 
            key={slide.id}
            autoPlay 
            muted 
            loop 
            playsInline
            poster={slide.mobile_media_url || slide.poster_url}
            className="w-full h-full object-cover transition-opacity duration-1000"
          >
            <source src={slide.media_url} type="video/mp4" />
          </video>
        ) : (
          <picture>
            {slide.mobile_media_url && <source media="(max-width: 768px)" srcSet={slide.mobile_media_url} />}
            <img 
              key={slide.id}
              src={slide.media_url || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'} 
              alt="AI Department Campus" 
              className="w-full h-full object-cover transition-opacity duration-1000"
            />
          </picture>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent"></div>
        <div className="absolute inset-0 bg-brand-primary/30 sm:hidden"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="sm:text-center lg:text-left max-w-2xl text-white transform transition-all duration-700 translate-y-0 opacity-100">
          
          {slide.subtitle && (
            <span className="inline-flex items-center text-xs font-bold tracking-widest text-brand-accent uppercase mb-4 bg-brand-secondary/80 px-3 py-1 rounded border border-brand-accent/30">
              {slide.subtitle}
            </span>
          )}
          
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl mb-6 text-white drop-shadow-md">
            {slide.title || 'Department of Artificial Intelligence'}
          </h1>
          
          <p className="mt-3 text-base sm:mt-5 sm:text-lg md:mt-5 md:text-xl leading-relaxed text-gray-200 drop-shadow">
            {slide.description}
          </p>
          
          <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
            {slide.button_text && (
              <div className="rounded-md shadow-sm">
                <Link to={slide.button_url || '/about'} className="w-full flex items-center justify-center px-8 py-3.5 border border-transparent text-base rounded btn-primary md:py-4 md:text-lg font-semibold">
                  {slide.button_text}
                </Link>
              </div>
            )}
            {slide.secondary_button_text && (
              <div className="mt-3 sm:mt-0">
                <Link to={slide.secondary_button_url || '#'} className="w-full flex items-center justify-center px-8 py-3.5 rounded border border-white/50 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm md:py-4 md:text-lg gap-2 transition font-semibold">
                  {slide.secondary_button_text}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Slide Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`w-3 h-3 rounded-full transition-colors ${idx === currentSlideIndex ? 'bg-brand-accent' : 'bg-white/40 hover:bg-white/60'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
