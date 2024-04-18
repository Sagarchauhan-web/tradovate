import apiClient from '@/lib/api-client';

export const login = async (requestData) => {
  try {
    const response = await apiClient.post('/LogIn', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};
