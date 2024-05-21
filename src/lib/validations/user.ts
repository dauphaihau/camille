import { trackingUserAccessOnWorkspaceSchema, userSchema } from '../../../prisma/zod';

export const updateProfileSchema = userSchema.pick({
  name: true,
});

export const updateUserTrackingSchema = userSchema.pick({
  lastAccessWorkspaceId: true,
}).merge(trackingUserAccessOnWorkspaceSchema.pick({
  lastAccessNotebookId: true,
  lastAccessPageId: true,
}));
