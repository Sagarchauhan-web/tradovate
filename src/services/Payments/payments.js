import apiClient from '@/lib/api-client';

export const getSubscriptions = async () => {
  try {
    const response = await apiClient.post('/GetSubscriptionPageList', {});
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getPaypalOrderInit = async (requestData) => {
  try {
    const response = await apiClient.post(
      '/paypalpayment/PayWithPaypal',
      requestData,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getActiveSubscription = async () => {
  try {
    const response = await apiClient.post('/GetActiveSubscription', {});
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getActiveSubscriptionCancelled = async () => {
  try {
    const response = await apiClient.post('/CancelActiveSubscription', {});
    return response.data;
  } catch (error) {
    return error;
  }
};
