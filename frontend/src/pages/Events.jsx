import React, { useState, useEffect } from 'react';
import { fetchEvents } from '../services/api';
import EventCard from '../components/EventCard';

const Events = () => {
  const [filter, setFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('UPCOMING');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const filters = [
    'All', 'Workshop', 'Seminar', 'Guest Lecture', 'Hackathon', 'Competition', 'FDP', 'Conference', 'Industrial Visit'
  ];

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const typeStr = filter !== 'All' ? filter.toUpperCase().replace(' ', '_') : 'All';
        const data = await fetchEvents(typeStr);
        if (data.success) {
          setEvents(data.data);
        } else {
          setError(data.message || 'Unable to load events.');
        }
      } catch (err) {
        setError('Unable to load events. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadEvents();
  }, [filter]);

  return (
    <div className="bg-bg-main min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-white py-12 md:py-20 border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 animate-fade-in-up">
              <p className="text-sm font-bold text-brand-accent tracking-widest uppercase mb-3">Stay Connected</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mb-6">Events & Activities</h1>
              <p className="text-lg text-text-secondary">
                Join our workshops, seminars, guest lectures, and hackathons. Discover the vibrant academic and extracurricular life within our department.
              </p>
            </div>
            <div className="flex-1 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Event" className="rounded-lg object-cover h-40 md:h-56 w-full shadow-md" />
                <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Conference" className="rounded-lg object-cover h-40 md:h-56 w-full shadow-md mt-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Filters */}
        <div className="bg-white p-2 rounded shadow-sm border border-border-subtle flex flex-wrap gap-1 mb-12">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                filter === f 
                  ? 'bg-brand-accent text-white shadow' 
                  : 'bg-transparent text-brand-primary hover:bg-bg-main'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="bg-white p-12 text-center rounded border border-border-subtle shadow-sm">
            <p className="text-brand-primary text-lg font-bold">Loading events...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-12 text-center rounded border border-red-200 shadow-sm">
            <p className="text-red-600 text-lg font-bold">{error}</p>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex justify-center border-b border-border-subtle mb-8">
              <button 
                className={`px-8 py-4 text-lg font-bold transition-colors border-b-4 ${activeTab === 'UPCOMING' ? 'border-brand-accent text-brand-primary' : 'border-transparent text-gray-400 hover:text-brand-primary'}`}
                onClick={() => setActiveTab('UPCOMING')}
              >
                Upcoming Events
              </button>
              <button 
                className={`px-8 py-4 text-lg font-bold transition-colors border-b-4 ${activeTab === 'PAST' ? 'border-brand-accent text-brand-primary' : 'border-transparent text-gray-400 hover:text-brand-primary'}`}
                onClick={() => setActiveTab('PAST')}
              >
                Past Events
              </button>
            </div>

            {/* Event Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(() => {
                const now = new Date();
                now.setHours(0,0,0,0);
                const displayedEvents = events.filter(e => {
                  const ed = new Date(e.event_date);
                  return activeTab === 'UPCOMING' ? ed >= now : ed < now;
                });

                if (displayedEvents.length === 0) {
                  return (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-16 text-center rounded border border-border-subtle shadow-sm">
                      <p className="text-text-secondary text-lg mb-4">No {activeTab.toLowerCase()} events found matching your criteria.</p>
                      <button onClick={() => setFilter('All')} className="btn-outline px-6 py-2 rounded">Clear Filters</button>
                    </div>
                  );
                }

                return displayedEvents.map(event => {
                  const eventDate = new Date(event.event_date);
                  const formattedEvent = {
                    id: event.id,
                    date: eventDate.getDate().toString().padStart(2, '0'),
                    month: eventDate.toLocaleString('default', { month: 'short' }).toUpperCase(),
                    title: event.title,
                    type: event.event_type.replace('_', ' '),
                    venue: event.venue,
                    time: `${event.start_time || ''} - ${event.end_time || ''}`,
                    image: event.poster_url || 'https://via.placeholder.com/800x400?text=Event',
                    isPast: activeTab === 'PAST'
                  };
                  return <EventCard key={formattedEvent.id} event={formattedEvent} />;
                });
              })()}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Events;
