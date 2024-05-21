import * as z from 'zod';
import { userSchema, workspaceSchema } from '../../../prisma/zod';
import { ROLE_USER_ON_WORKSPACE } from '../../config/const';

export const addMemberSchema = z.object({
  workspaceId: workspaceSchema.shape.id,
  email: userSchema.shape.email,
});

export const updateRoleMemberSchema = z.object({
  workspaceId: z.string(),
  userId: z.string(),
  role: z.nativeEnum(ROLE_USER_ON_WORKSPACE),
});
