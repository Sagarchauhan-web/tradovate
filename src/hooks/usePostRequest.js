import apiClient from '@/lib/api-client';
import { CanceledError } from 'axios';
import { useEffect, useState } from 'react';

const usePostRequest = ({ endpoint, requestData, requestConfig, deps }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.post(endpoint, requestData, {
          signal,
          ...requestConfig,
        });
        setData(response.data);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps || []);

  return { data, error, isLoading };
};

export default usePostRequest;
