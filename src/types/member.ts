import { z } from 'zod';
import { addMemberSchema, deleteMemberSchema, updateRoleMemberSchema } from 'validations/member';

export type IAddMember = z.infer<typeof addMemberSchema>;

export type IDeleteMember = z.infer<typeof deleteMemberSchema>;

export type IUpdateRoleMember = z.infer<typeof updateRoleMemberSchema>;
