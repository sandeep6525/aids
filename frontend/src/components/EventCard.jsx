import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded overflow-hidden card-hover group flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white shadow-md rounded px-3 py-2 text-center min-w-[60px] border-t-2 border-brand-accent">
          <span className="block text-xl font-bold text-brand-primary leading-none mb-1">{event.date}</span>
          <span className="block text-xs font-semibold text-brand-accent uppercase">{event.month}</span>
        </div>
        <div className="absolute top-4 right-4 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded shadow">
          {event.type}
        </div>
        {event.isPast && (
          <div className="absolute inset-0 bg-brand-primary/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-red-600 text-white font-bold px-4 py-2 rounded shadow uppercase tracking-wider">Completed</span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-brand-primary mb-3 line-clamp-2">{event.title}</h3>
        <div className="space-y-2 mb-6 flex-grow">
          <div className="flex items-center text-sm text-text-secondary">
            <svg className="w-4 h-4 mr-2 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="flex items-center text-sm text-text-secondary">
            <svg className="w-4 h-4 mr-2 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{event.time}</span>
          </div>
        </div>
        <Link to={`/events/${event.id}`} className="text-sm font-semibold text-brand-accent hover:text-brand-primary transition-colors inline-flex items-center mt-auto">
          View Details
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
