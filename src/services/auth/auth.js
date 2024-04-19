import apiClient from '@/lib/api-client';

export const login = async (requestData) => {
  try {
    const response = await apiClient.post('/LogIn', requestData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const register = async (requestData) => {
  console.log(requestData);
  try {
    const response = await apiClient.post('/SignUp', requestData);
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
