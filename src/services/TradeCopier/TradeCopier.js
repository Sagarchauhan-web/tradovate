import apiClient from '@/lib/api-client';

export const saveAccountTradeCopier = async (requestData) => {
  try {
    const response = await apiClient.post('/SaveMultiAccount', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getAccountTradeCopierData = async (requestData) => {
  try {
    const response = await apiClient.post('/GetMultiAccount', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const addAccountTradeCopierData = async (requestData) => {
  try {
    const response = await apiClient.post('/add-trade-data', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const deleteAccountTradeCopierData = async (id) => {
  try {
    const response = await apiClient.post('/DeleteMultiAccount', { id });
    return response.data;
  } catch (error) {
    return error;
  }
};
