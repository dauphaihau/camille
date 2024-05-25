import { Workspace } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { IUpdateProfile, IUpdateTrackingUser } from 'types/user';
import { getTrackingUserByWorkspace, updateProfile, updateTracking } from '../server-actions/user';

export function useUpdateTrackingUser() {
  return useMutation({
    mutationFn: (paramsUpdateTracking: IUpdateTrackingUser) => updateTracking(paramsUpdateTracking),
  });
}

export function useGetTrackingByWorkspace() {
  return useMutation({
    mutationFn: (workspaceId: Workspace['id']) => getTrackingUserByWorkspace(workspaceId),
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (payload: IUpdateProfile) => updateProfile(payload),
  });
}
