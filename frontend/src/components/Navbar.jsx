import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { scrollDirection, isTop } = useScrollDirection();
  const dropdownRef = useRef(null);

  const primaryLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Academics', path: '/academics' },
    { name: 'Events', path: '/events' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Placements', path: '/placements' },
    { name: 'Projects', path: '/projects' },
  ];

  const moreLinks = [
    { name: 'Research', path: '/research' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Alumni', path: '/alumni' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Announcements', path: '/announcements' },
  ];

  const allMobileLinks = [...primaryLinks, ...moreLinks, { name: 'Contact', path: '/contact' }];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const isMoreActive = moreLinks.some(l => isActive(l.path));

  // Handle escape key to close menus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      <nav 
        className={`bg-white sticky top-0 z-50 transition-all duration-300 ease-in-out ${
          scrollDirection === 'down' && !isTop && !isOpen ? '-translate-y-full' : 'translate-y-0'
        } ${isTop ? 'border-b border-border-subtle shadow-none py-1' : 'shadow-md border-b-0 py-0'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px] lg:h-20 transition-all duration-300">
            {/* Logo area */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-4 group focus:outline-none focus:ring-2 focus:ring-gold rounded">
                <div className="w-10 h-10 lg:w-11 lg:h-11 bg-brand-primary rounded flex items-center justify-center text-brand-accent font-bold text-xl lg:text-2xl shadow-sm group-hover:bg-brand-secondary transition-colors">AI</div>
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] lg:text-xs font-semibold text-text-secondary leading-tight uppercase tracking-widest">Department of</span>
                  <span className="text-lg lg:text-xl font-bold text-brand-primary leading-tight whitespace-nowrap">Artificial Intelligence</span>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-6 lg:space-x-8">
              {primaryLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gold rounded px-1 py-1 ${isActive(link.path) ? 'text-brand-accent' : 'text-brand-primary hover:text-brand-accent'}`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Dropdown for More */}
              <div 
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  className={`flex items-center text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gold rounded px-1 py-1 ${isMoreActive ? 'text-brand-accent' : 'text-brand-primary hover:text-brand-accent'}`}
                >
                  More <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div 
                  className={`absolute top-full right-0 w-56 bg-white border border-border-subtle shadow-xl rounded-b-xl rounded-tl-xl py-2 z-50 transition-all duration-200 origin-top-right ${
                    dropdownOpen ? 'opacity-100 transform-none pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  {moreLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setDropdownOpen(false)}
                      className={`block px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:bg-bg-main ${isActive(link.path) ? 'text-brand-accent bg-bg-main/50 border-l-4 border-brand-accent pl-4' : 'text-brand-primary hover:bg-bg-main hover:text-brand-accent border-l-4 border-transparent'}`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link 
                to="/contact" 
                className={`text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gold rounded px-1 py-1 ${isActive('/contact') ? 'text-brand-accent' : 'text-brand-primary hover:text-brand-accent'}`}
              >
                Contact
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="xl:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(true)} 
                aria-label="Open menu"
                className="text-brand-primary hover:text-brand-accent focus:outline-none focus:ring-2 focus:ring-gold rounded p-1 transition-colors"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay Backdrop */}
      <div 
        className={`fixed inset-0 bg-brand-primary/40 z-[60] backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-[280px] sm:w-[320px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out xl:hidden flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border-subtle">
          <span className="font-bold text-brand-primary text-lg">Menu</span>
          <button 
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1 transition-colors bg-gray-50"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="px-2 space-y-1">
            {allMobileLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3.5 rounded-lg text-base font-semibold transition-colors ${
                  isActive(link.path) 
                    ? 'text-brand-accent bg-bg-main border-l-4 border-brand-accent' 
                    : 'text-brand-primary hover:bg-bg-main hover:text-brand-accent border-l-4 border-transparent'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="p-6 border-t border-border-subtle bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-primary rounded flex items-center justify-center text-brand-accent font-bold text-sm shadow-sm">AI</div>
            <div>
              <p className="text-xs font-bold text-brand-primary leading-tight">Artificial Intelligence</p>
              <p className="text-[10px] text-text-secondary leading-tight">University Department</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
