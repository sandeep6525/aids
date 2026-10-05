import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Eye, Trash2, X, Check } from 'lucide-react';

const ContactMessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await api.get('/contact/admin');
      if (response.data.success) setMessages(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/contact/admin/${id}`, { status: 'READ' });
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message permanently?')) {
      await api.delete(`/contact/admin/${id}`);
      fetchMessages();
      setSelectedMessage(null);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6 flex flex-col h-[calc(100vh-120px)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">Contact Messages</h2>
      </div>

      <div className="flex flex-1 overflow-hidden gap-6">
        {/* Messages List */}
        <div className="w-1/3 border-r border-border-subtle overflow-y-auto pr-4">
          {messages.length === 0 && <p className="text-gray-500">No messages.</p>}
          {messages.map((m) => (
            <div 
              key={m.id} 
              onClick={() => { setSelectedMessage(m); if (m.status === 'UNREAD') markAsRead(m.id); }}
              className={`p-4 border-b border-border-subtle cursor-pointer transition-colors ${selectedMessage?.id === m.id ? 'bg-bg-main border-l-4 border-l-gold' : 'hover:bg-gray-50'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className={`font-bold truncate ${m.status === 'UNREAD' ? 'text-brand-primary' : 'text-gray-700'}`}>{m.name}</h4>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{new Date(m.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{m.subject}</p>
              {m.status === 'UNREAD' && <span className="inline-block mt-2 bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>}
            </div>
          ))}
        </div>

        {/* Message Detail */}
        <div className="w-2/3 overflow-y-auto pl-2">
          {selectedMessage ? (
            <div>
              <div className="flex justify-between items-start border-b border-border-subtle pb-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-brand-primary mb-2">{selectedMessage.subject}</h3>
                  <p className="text-sm text-gray-600"><strong>From:</strong> {selectedMessage.name} &lt;{selectedMessage.email}&gt;</p>
                  <p className="text-sm text-gray-600"><strong>Phone:</strong> {selectedMessage.phone || 'N/A'}</p>
                  <p className="text-sm text-gray-500 mt-1">{new Date(selectedMessage.created_at).toLocaleString()}</p>
                </div>
                <button onClick={() => handleDelete(selectedMessage.id)} className="text-red-500 hover:bg-red-50 p-2 rounded flex items-center">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </button>
              </div>
              <div className="bg-gray-50 p-6 rounded whitespace-pre-wrap text-gray-800 leading-relaxed font-sans">
                {selectedMessage.message}
              </div>
              <div className="mt-8">
                <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`} className="bg-brand-primary text-white px-6 py-2 rounded font-bold hover:bg-brand-secondary inline-block">
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a message to read
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ContactMessagesManager;
