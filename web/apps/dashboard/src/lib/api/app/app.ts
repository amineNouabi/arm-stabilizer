import type { AxiosInstance } from 'axios';

export interface Status {
  serialPath: string;
  baudRate: number;
}

export const getStatus = async (axios: AxiosInstance): Promise<Status> =>
  (await axios.get<Status>('/status')).data;

export const updateBaudRate = async (
  axios: AxiosInstance,
  baudRate: number,
): Promise<Status> => (await axios.put<Status>('/status', { baudRate })).data;
