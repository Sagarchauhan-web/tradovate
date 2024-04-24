import apiClient from '@/lib/api-client';

export const me = async () => {
  try {
    const response = await apiClient.get('/Me');
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTokenUrl = async () => {
  try {
    const response = await apiClient.get('/GetTokenUrl');
    return response.data;
  } catch (error) {
    return error;
  }
};

export const login = async (requestData) => {
  try {
    const response = await apiClient.post('/LogIn', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const SetAccountType = async (requestData) => {
  try {
    const response = await apiClient.post('/SetAccountType', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const register = async (requestData) => {
  try {
    const response = await apiClient.post('/SignUp', requestData);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.get('/LogOut');
    localStorage.removeItem('token');
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};
