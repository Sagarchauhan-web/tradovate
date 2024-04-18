import apiClient from '@/lib/api-client';
import { CanceledError } from 'axios';
import { useEffect, useState } from 'react';
const useGetData = ({ endpoint, requestConfig, deps }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();
      const { signal } = controller;

      setIsLoading(true);

      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await apiClient.post(endpoint, {
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps || [],
  );

  return { data, error, isLoading };
};

export default useGetData;
