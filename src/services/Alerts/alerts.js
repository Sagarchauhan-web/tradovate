import apiClient from '@/lib/api-client';

export const getAlerts = async (requestData) => {
  try {
    const response = await apiClient.post('/GetAlertData', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};
