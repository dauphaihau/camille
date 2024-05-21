import { useMutation } from '@tanstack/react-query';
import { IUpdateTrackingUser } from 'types/user';
import { fetcher } from '../../core/helpers';
import { Response } from '../../types';
import { useGetDetailWorkspace } from './workspace';

export function useUpdateTrackingUser() {
  const { data: { user } = {} } = useGetDetailWorkspace();
  return useMutation({
    mutationFn: (paramsUpdateTracking: IUpdateTrackingUser) => {
      return fetcher<Response>(`/api/user/tracking/${user?.id}`, paramsUpdateTracking, 'PATCH');
    },
  });
}
