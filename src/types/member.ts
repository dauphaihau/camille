import { User, Workspace } from '@prisma/client';
import { ROLE_USER_ON_WORKSPACE } from 'config/const';

export type IAddMember = {
  workspaceId: Workspace['id']
  email: User['email']
}

export type IUpdateRoleMember = {
  userId: User['id']
  workspaceId: Workspace['id']
  role: ROLE_USER_ON_WORKSPACE
}
