import apiClient from '@/lib/api-client';

export const getOrders = async () => {
  try {
    const response = await apiClient.post('/GetOrders', {
      from_date: '2024-04-22',
      to_date: '2024-04-22',
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
