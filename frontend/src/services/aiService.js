import api from './api';

export const getLegalAssistance = async (message, history) => {
  const response = await api.post('/ai/legal-assist', { message, history });
  return response.data.response;
};