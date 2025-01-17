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
  updateStatus: UseMutateFunction<Status, Error, number | undefined>;
  isPendingUpdate: boolean;
} => {
  const { getStatus, updateStatus } = useAppApi();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: [APP_STATUS_KEY],
    queryFn: getStatus,
    retry: 3,
    retryDelay: 3000,
  });

  const { mutate, isPending: isPendingUpdate } = useMutation<
    Status,
    Error,
    number | undefined
  >({
    mutationFn: updateStatus,
    onSuccess: async (updatedData) => {
      toast({ title: 'Status updated successfully' });
      try {
        await queryClient.invalidateQueries({ queryKey: [APP_STATUS_KEY] });
      } catch (refetchError) {
        console.log(refetchError);
      }
    },
    onError: (mutateError) => {
      console.log(mutateError);
      toast({ title: 'Error updating Status', variant: 'destructive' });
    },
  });

  return { data, isLoading, error, updateStatus: mutate, isPendingUpdate };
};
