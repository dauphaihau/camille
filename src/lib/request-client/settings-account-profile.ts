import { useMutation } from '@tanstack/react-query';
import { fetcher } from 'core/helpers';
import { IUpdateProfile } from 'types/user';

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (payload: IUpdateProfile) => {
      return fetcher<Response>('/api/settings/account/profile', payload, 'PATCH');
    },
  });
}
