import { z } from 'zod';
import { updateProfileSchema, updateUserTrackingSchema } from '../lib/validations/user';

export type IUpdateProfile = z.infer<typeof updateProfileSchema>;

export type IUpdateTrackingUser = z.infer<typeof updateUserTrackingSchema>
