import { useAxios } from '@/hooks/use-axios';
import { getStatus, updateBaudRate, type Status } from './app';

export const useAppApi = (): {
  getStatus: () => Promise<Status>;
  updateBaudRate: (baudRate: number) => Promise<Status>;
} => {
  const { axiosInstance } = useAxios();

  return {
    getStatus: async () => getStatus(axiosInstance),
    updateBaudRate: async (baudRate: number) =>
      updateBaudRate(axiosInstance, baudRate),
  };
};
