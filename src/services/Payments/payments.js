import apiClient from '@/lib/api-client';

export const getSubscriptions = async () => {
  try {
    const response = await apiClient.get('/payment/subscription-list');
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getOrderInit = async (requestData) => {
  try {
    const response = await apiClient.post('/payment/order-init', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};
