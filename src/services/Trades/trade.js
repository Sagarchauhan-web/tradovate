import apiClient from '@/lib/api-client';

export const createTrade = async (requestData) => {
  try {
    const response = await apiClient.post('/SaveSettingData', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};
