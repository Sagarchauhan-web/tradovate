import apiClient from '@/lib/api-client';

export const getAccountList = async () => {
  try {
    const response = await apiClient.post('/GetAccountList', {});
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAccountMaxLoss = async (requestData) => {
  try {
    const response = await apiClient.post('/GetMaxLoss', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const setAccountMaxLoss = async (requestData) => {
  try {
    const response = await apiClient.post('/AddMaxLoss', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};
