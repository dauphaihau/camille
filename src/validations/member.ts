import * as z from 'zod';
import { ROLE_USER_ON_WORKSPACE } from 'config/const';
import { userSchema, workspaceSchema } from '../../prisma/zod';

export const addMemberSchema = z.object({
  workspaceId: workspaceSchema.shape.id,
  email: userSchema.shape.email,
});

export const deleteMemberSchema = z.object({
  workspaceId: workspaceSchema.shape.id,
  userId: userSchema.shape.id,
});

export const updateRoleMemberSchema = z.object({
  workspaceId: workspaceSchema.shape.id,
  userId: userSchema.shape.id,
  role: z.nativeEnum(ROLE_USER_ON_WORKSPACE),
});
