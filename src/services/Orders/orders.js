import apiClient from '@/lib/api-client';

export const getOrders = async (requestData) => {
  try {
    const response = await apiClient.post('/GetOrders', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};
