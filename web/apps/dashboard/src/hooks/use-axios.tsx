import axiosInstance from '@/lib/axios';
import type { AxiosInstance } from 'axios';

export const useAxios = (): { axiosInstance: AxiosInstance } => {
  return {
    axiosInstance,
  };
};
