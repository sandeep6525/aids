const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchFaculty = async (designation = '') => {
  try {
    const url = designation ? `${API_URL}/faculty?designation=${encodeURIComponent(designation)}` : `${API_URL}/faculty`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch faculty');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchEvents = async (type = 'All', status = '') => {
  try {
    let url = `${API_URL}/events?`;
    if (type !== 'All') url += `type=${encodeURIComponent(type)}&`;
    if (status) url += `status=${encodeURIComponent(status)}&`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch events');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchUpcomingEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/events/upcoming`);
    if (!response.ok) throw new Error('Failed to fetch upcoming events');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchEventById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/events/${id}`);
    if (!response.ok) throw new Error('Failed to fetch event details');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchProjects = async (category = 'All', year = '') => {
  try {
    let url = `${API_URL}/projects?`;
    if (category !== 'All') url += `category=${encodeURIComponent(category)}&`;
    if (year) url += `year=${encodeURIComponent(year)}&`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchFeaturedProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/projects/featured`);
    if (!response.ok) throw new Error('Failed to fetch featured projects');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchProjectById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/projects/${id}`);
    if (!response.ok) throw new Error('Failed to fetch project details');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// API Wrapper simulating Axios for ease of use
const getToken = () => localStorage.getItem('token');

const request = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });
  
  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = { success: false, message: 'Invalid JSON response' };
  }

  if (!response.ok) {
    throw { response: { data, status: response.status } };
  }

  return { data, status: response.status };
};

export const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, body, options = {}) => {
    return request(endpoint, { 
      method: 'POST', 
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...options
    });
  },
  put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};
