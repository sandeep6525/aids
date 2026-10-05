import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';

const AchievementsManager = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await api.get('/achievements/admin');
      if (response.data.success) {
        setAchievements(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching achievements', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status, is_published, is_featured) => {
    try {
      await api.patch(`/achievements/admin/${id}/status`, { status, is_published, is_featured });
      fetchAchievements(); // Refresh list
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await api.delete(`/achievements/admin/${id}`);
        fetchAchievements();
      } catch (error) {
        console.error('Error deleting achievement', error);
      }
    }
  };

  if (loading) return <div className="p-8">Loading achievements...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border-subtle p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-primary">Achievements Review Workflow</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-bg-main border-b border-border-subtle">
              <th className="py-3 px-4 font-semibold text-brand-primary">Student</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Title</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Competition</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Status</th>
              <th className="py-3 px-4 font-semibold text-brand-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {achievements.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">No achievements found.</td>
              </tr>
            ) : (
              achievements.map((ach) => (
                <tr key={ach.id} className="border-b border-border-subtle hover:bg-gray-50">
                  <td className="py-3 px-4">{ach.student_name}</td>
                  <td className="py-3 px-4">{ach.title}</td>
                  <td className="py-3 px-4">{ach.competition}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      ach.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                      ach.status === 'PENDING_REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                      ach.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {ach.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    {ach.status === 'PENDING_REVIEW' && (
                      <>
                        <button onClick={() => updateStatus(ach.id, 'PUBLISHED', true, false)} className="text-green-600 hover:text-green-800" title="Approve & Publish">
                          <CheckCircle className="w-5 h-5" />
                        </button>
                        <button onClick={() => updateStatus(ach.id, 'REJECTED', false, false)} className="text-red-600 hover:text-red-800" title="Reject">
                          <XCircle className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    {ach.status === 'PUBLISHED' && (
                      <button onClick={() => updateStatus(ach.id, 'ARCHIVED', false, false)} className="text-gray-500 hover:text-gray-700 text-sm border px-2 py-1 rounded">
                        Archive
                      </button>
                    )}
                    <button onClick={() => handleDelete(ach.id)} className="text-red-500 hover:text-red-700 ml-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AchievementsManager;
