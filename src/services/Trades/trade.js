import apiClient from '@/lib/api-client';

export const createTrade = async (requestData) => {
  try {
    const response = await apiClient.post('/SaveSettingData', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTrades = async () => {
  try {
    const response = await apiClient.get('/GetSettingData');
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getSymbols = async () => {
  try {
    const response = await apiClient.get('/GetNewsSymbolMapping');
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteTrade = async (requestData) => {
  try {
    const response = await apiClient.post('/DeleteSettingData', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getMinTickAndLot = async (requestData) => {
  // console.log('deleteTrade', requestData);
  try {
    const response = await apiClient.post('/GetMinTickAndLot', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};
