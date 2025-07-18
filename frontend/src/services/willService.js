import api from './api';

export const createWill = (willData) => api.post('/wills/create', willData);
export const getUserWills = async () => (await api.get('/wills')).data;
export const getWillById = async (willId) => (await api.get(`/wills/${willId}`)).data;
export const updateWill = (willId, willData) => api.put(`/wills/${willId}`, willData);
export const deleteWill = (willId) => api.delete(`/wills/${willId}`);

