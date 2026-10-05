import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../../services/authApi';
import { useAuth } from '../../context/AuthContext';

const UserManagement = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'FACULTY', password: '' });
  const [formError, setFormError] = useState('');

  const loadUsers = async () => {
    try {
      const res = await fetchWithAuth('/admin/users', {}, token);
      if (res.success) {
        setUsers(res.data);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [token]);

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const res = await fetchWithAuth(`/admin/users/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ is_active: !currentStatus })
      }, token);
      
      if (res.success) {
        loadUsers();
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setFormError('');
    try {
      const res = await fetchWithAuth('/admin/users', {
        method: 'POST',
        body: JSON.stringify(formData)
      }, token);
      
      if (res.success) {
        setShowForm(false);
        setFormData({ name: '', email: '', role: 'FACULTY', password: '' });
        loadUsers();
      } else {
        setFormError(res.message);
      }
    } catch (err) {
      setFormError('Failed to create user');
    }
  };

  if (loading) return <p className="text-text-secondary">Loading users...</p>;
  if (error) return <p className="text-red-600 font-bold">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-end border-b border-border-subtle pb-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-primary">Users & Roles</h1>
          <p className="text-text-secondary text-sm mt-1">Manage system administrators and their permissions.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn-primary px-4 py-2 rounded text-sm font-bold shadow-sm"
        >
          {showForm ? 'Cancel' : 'Add New User'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow-sm border border-border-subtle mb-8 max-w-2xl">
          <h2 className="text-xl font-bold text-brand-primary mb-4">Create New User</h2>
          {formError && <p className="text-red-600 text-sm mb-4 bg-red-50 p-2 rounded">{formError}</p>}
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-brand-primary mb-1">Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded focus:ring-gold focus:border-brand-accent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-primary mb-1">Email *</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded focus:ring-gold focus:border-brand-accent outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-primary mb-1">Role *</label>
                <select required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded focus:ring-gold focus:border-brand-accent outline-none">
                  <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                  <option value="HOD">HOD</option>
                  <option value="FACULTY">FACULTY</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-primary mb-1">Temporary Password *</label>
                <input required type="text" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-3 py-2 border border-border-subtle rounded focus:ring-gold focus:border-brand-accent outline-none" />
                <p className="text-xs text-text-secondary mt-1">Provide this securely to the user.</p>
              </div>
            </div>
            <button type="submit" className="btn-primary px-6 py-2 rounded font-bold shadow-sm">Create User</button>
          </form>
        </div>
      )}

      <div className="bg-white rounded border border-border-subtle shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-bg-main">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-brand-primary uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-center text-xs font-bold text-brand-primary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-brand-primary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {users.map(u => (
                <tr key={u.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-brand-primary">{u.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{u.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="bg-brand-secondary text-white px-2 py-1 rounded text-xs font-bold">{u.role}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {u.is_active ? 
                      <span className="text-green-600 bg-green-50 px-2 py-1 rounded font-bold text-xs border border-green-200">Active</span> : 
                      <span className="text-red-600 bg-red-50 px-2 py-1 rounded font-bold text-xs border border-red-200">Inactive</span>
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleStatusChange(u.id, u.is_active)}
                      className={`${u.is_active ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'} ml-4 font-bold`}
                    >
                      {u.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
