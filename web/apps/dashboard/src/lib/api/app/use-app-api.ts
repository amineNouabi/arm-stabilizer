import { useAxios } from '@/hooks/use-axios';
import { getStatus, updateStatus, type Status } from './app';

export const useAppApi = (): {
  getStatus: () => Promise<Status>;
  updateStatus: (baudRate?: number) => Promise<Status>;
} => {
  const { axiosInstance } = useAxios();

  return {
    getStatus: async () => getStatus(axiosInstance),
    updateStatus: async (baudRate?: number) =>
      updateStatus(axiosInstance, baudRate),
  };
};
