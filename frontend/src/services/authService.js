import api from './api';

export const registerUser = (name, email, password) => api.post('/auth/register', { name, email, password });
export const loginUser = async (email, password) => (await api.post('/auth/login', { email, password })).data;
export const toggleDarkModePref = () => api.patch('/auth/theme');
export const updateProfile = (name) => api.put('/auth/profile', { name });
export const changePassword = (currentPassword, newPassword) => api.put('/auth/password', { currentPassword, newPassword });