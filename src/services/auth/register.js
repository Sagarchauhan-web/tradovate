import apiClient from '@/lib/api-client';

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
