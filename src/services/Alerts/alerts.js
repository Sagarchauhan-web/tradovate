import apiClient from '@/lib/api-client';

export const getAlerts = async () => {
  try {
    const response = await apiClient.post('/GetAlertData', {
      from_date: '2024-04-22',
      to_date: '2024-04-22',
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
