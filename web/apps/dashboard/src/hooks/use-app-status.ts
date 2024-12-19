'use client';

import { type Status } from '@/lib/api/app/app';
import { APP_STATUS_KEY } from '@/lib/api/app/config';
import { useAppApi } from '@/lib/api/app/use-app-api';
import type { UseMutateFunction } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from './use-toast';

export const useAppStatus = (): {
  data?: Status;
  isLoading: boolean;
  error: Error | null;
  updateBaudRate: UseMutateFunction<Status, Error, number>;
  isPendingUpdate: boolean;
} => {
  const { getStatus, updateBaudRate } = useAppApi();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: [APP_STATUS_KEY],
    queryFn: getStatus,
    retry: 3,
    retryDelay: 3000,
  });

  const { mutate, isPending: isPendingUpdate } = useMutation({
    mutationFn: updateBaudRate,
    onSuccess: async (updatedData) => {
      toast({ title: 'Baud rate updated successfully' });
      try {
        await queryClient.invalidateQueries({ queryKey: [APP_STATUS_KEY] });
      } catch (refetchError) {
        console.log(refetchError);
      }
    },
    onError: (mutateError) => {
      console.log(mutateError);
      toast({ title: 'Error updating baud rate', variant: 'destructive' });
    },
  });

  return { data, isLoading, error, updateBaudRate: mutate, isPendingUpdate };
};
