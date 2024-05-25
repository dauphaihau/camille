import { z } from 'zod';
import { updateProfileSchema, updateUserTrackingSchema } from '../validations/user';

export type IUpdateProfile = z.infer<typeof updateProfileSchema>;

export type IUpdateTrackingUser = z.infer<typeof updateUserTrackingSchema>
