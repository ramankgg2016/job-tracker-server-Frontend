// client/src/api/jobApi.js
import axios from 'axios';

// Get backend URL from environment variables
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to attach token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const register = (userData) => api.post('/auth/register', userData); // 
export const login = (userData) => api.post('/auth/login', userData);     // 

export const getJobs = (params) => api.get('/jobs', { params });// 
export const getJobById = (id) => api.get(`/jobs/${id}`);
export const createJob = (jobData) => api.post('/jobs', jobData);         // 
export const updateJob = (id, updateStatus) => api.put(`/jobs/${id}`, updateStatus); // 
export const deleteJob = (id) => api.delete(`/jobs/${id}`);
export const updateStatus = (id, editStatus) => {
    return api.patch(`/jobs/status/${id}`, editStatus);
};      //

export default api;