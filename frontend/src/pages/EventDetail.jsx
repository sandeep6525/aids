import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchEventById } from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvent = async () => {
      setLoading(true);
      try {
        const data = await fetchEventById(id);
        if (data.success) {
          setEvent(data.data);
        } else {
          setError(data.message || 'Event not found');
        }
      } catch (err) {
        setError('Failed to load event details.');
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id]);

  if (loading) return (
    <div className="bg-bg-main min-h-screen py-20 flex items-center justify-center">
      <p className="text-xl font-bold text-brand-primary">Loading event details...</p>
    </div>
  );

  if (error || !event) return (
    <div className="bg-bg-main min-h-screen py-20 flex flex-col items-center justify-center">
      <p className="text-xl font-bold text-red-600 mb-4">{error || 'Event not found'}</p>
      <Link to="/events" className="btn-outline px-6 py-2 rounded">&larr; Back to Events</Link>
    </div>
  );

  return (
    <div className="bg-bg-main min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/events" className="text-brand-accent font-bold hover:text-brand-primary inline-flex items-center mb-6">
          &larr; Back to Events
        </Link>
        <div className="bg-white p-8 rounded shadow border border-border-subtle">
          <div className="mb-6 flex items-center justify-between">
            <span className="bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded">
              {event.event_type.replace('_', ' ')}
            </span>
            <span className="text-brand-accent font-bold">{new Date(event.event_date).toDateString()}</span>
          </div>
          <h1 className="text-3xl font-bold text-brand-primary mb-4">{event.title}</h1>
          {event.poster_url && (
            <div className="h-64 sm:h-96 w-full rounded mb-8 overflow-hidden">
              <img src={event.poster_url} alt={event.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="prose max-w-none text-text-secondary mb-8">
            <p>{event.description || 'No description provided.'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-bg-main p-6 rounded border border-border-subtle">
            <div>
              <h4 className="text-sm font-bold text-brand-primary mb-1">Time</h4>
              <p className="text-text-secondary">{event.start_time} - {event.end_time}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-brand-primary mb-1">Venue</h4>
              <p className="text-text-secondary">{event.venue}</p>
            </div>
            {event.speaker && (
              <div className="sm:col-span-2">
                <h4 className="text-sm font-bold text-brand-primary mb-1">Speaker</h4>
                <p className="text-text-secondary">{event.speaker} {event.speaker_designation ? `(${event.speaker_designation})` : ''}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
