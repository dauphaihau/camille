"use client"

import { useRouter } from "next/navigation"
import { useReducer } from "react"
import * as React from "react";
import { User, UserOnWorkspace } from "@prisma/client"

import { DropdownMenu } from "core/components/dropdown"
import { Button, Icons, Row } from "core/components"
import { Alert } from "core/components/alert"
import { toast } from "core/components/Toast"
import { useWorkspaceContext } from "components/context/workspace-context";
import { cn } from "core/helpers";
import { ROLE_USER_ON_WORKSPACE } from "config/const";
import { deleteMember, memberLeave, updateRoleMember } from "lib/request-by-swr/settings-member";

interface MemberOperationsProps {
  member: Pick<User, "id" | 'name'> & Pick<UserOnWorkspace, "role">,
  placeOnSidebar?: boolean
  currentUserIsAdmin: boolean
  members: UserOnWorkspace[]
}

const initialState: {[k: string]: boolean} = {
  showDropdown: false,
  showDeleteAlert: false,
  showUpdateRoleAlert: false,
  isDeleteLoading: false,
  userLeaveWorkspace: false,
}

export function MemberOperations({ member, members, currentUserIsAdmin }: MemberOperationsProps) {
  const router = useRouter()
  const { workspace, userOnWorkspace, user } = useWorkspaceContext();
  const [event, setEvent] = useReducer((prev, next) => ({
    ...prev, ...next
  }), initialState)

  console.log('dauphaihau debug: user-on-workspace', userOnWorkspace)
  console.log('dauphaihau debug: user', user)

  if (!userOnWorkspace || !workspace || !user) {
    return null
  }

  async function handleDelete() {
    if (workspace && member) {
      setEvent({ isDeleteLoading: true })

      let response;
      if (event.userLeaveWorkspace && userOnWorkspace) {
        response = await memberLeave({ workspaceId: workspace.id })
      } else {
        response = await deleteMember({
          userId: member.id,
          workspaceId: workspace.id
        })
      }

      setEvent({ isDeleteLoading: false })

      if (response.code !== '200') {
        if (response.code === '403') {
          return toast({
            message: response.message,
            type: "error",
          })
        }

        return toast({
          title: "Something went wrong.",
          message: "Your member was not deleted. Please try again.",
          type: "error",
        })
      }

      setEvent({ showDeleteAlert: false })

      // // redirect first workspace in list workspaces user can access
      if (event.userLeaveWorkspace && response?.data?.workspace?.domain) {
        router.push(`/${response.data.workspace.domain}`)
        // setEvent({ userLeaveWorkspace: false })
      }

      router.refresh()
    }
  }

  async function handleUpdateRole(role) {
    if (!workspace || member.role === role || !user) return

    if (role === ROLE_USER_ON_WORKSPACE.MEMBER) {

      console.log('dauphaihau debug: members-some-m-m-role-role-user-on-workspace-admin-', members.some(m => m.role === ROLE_USER_ON_WORKSPACE.ADMIN))
      if (member.id === user.id) {
        const admins = members.filter((m) => m.role === ROLE_USER_ON_WORKSPACE.ADMIN)
        if (admins.length === 1) return setEvent({ showUpdateRoleAlert: open })
      }

      // if (workspace.totalMembers === 1) {
      //   return setEvent({ showUpdateRoleAlert: open })
      // }
    }

    // if (workspace.totalMembers === 1 && role === ROLE_USER_ON_WORKSPACE.MEMBER) {
    //   return setEvent({ showUpdateRoleAlert: open })
    // }

    if (!workspace.isStandard) {
      return router.push(`/${workspace.domain}/settings/plans`)
    }

    if (workspace && member) {
      setEvent({ isDeleteLoading: true })
      const response = await updateRoleMember({ userId: member.id, workspaceId: workspace.id, role })

      console.log('dauphaihau debug: response', response)
      setEvent({ isDeleteLoading: false })

      if (response.code !== '200') {
        return toast({
          title: "Something went wrong.",
          message: "Your member was not update. Please try again.",
          type: "error",
        })
      }
      setEvent({ showDeleteAlert: false })
      router.refresh()
    }
  }

  return (
    <>
      <DropdownMenu
        open={event.showDropdown}
        onOpenChange={(open) => setEvent({ showDropdown: open })}
      >
        <DropdownMenu.Trigger
          // disabled={
          //   userOnWorkspace.userId !== member.id &&
          //   userOnWorkspace.role === ROLE_USER_ON_WORKSPACE.MEMBER
          // }
          disabled={
            // user.id !== member.id &&
            user.id === member.id && member.role === ROLE_USER_ON_WORKSPACE.MEMBER
          }
        >
          <Icons.ellipsisHorizontal
            size={12}
            className={cn('btn-icon  group-hover/member:visible text-[#686662]')}
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className='absolute w-[265px] top-0 left-[-13rem]'
          >
            {
              // userOnWorkspace.role === ROLE_USER_ON_WORKSPACE.ADMIN && <>
              // user.id === member.id && member.role === ROLE_USER_ON_WORKSPACE.ADMIN && <>
              currentUserIsAdmin && <>
                <DropdownMenu.Item onClick={() => handleUpdateRole(ROLE_USER_ON_WORKSPACE.ADMIN)}>
                  <Row align='center' classes='gap-3'>
                    <div>
                      <div className='font-medium'>Admin</div>
                      <div className='text-[#787673] text-xs'>
                        Can change workspace settings and invite new members to the workspace.
                      </div>
                    </div>
                    {member.role === ROLE_USER_ON_WORKSPACE.ADMIN && <Icons.check className='text-2xl'/>}
                  </Row>
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => handleUpdateRole(ROLE_USER_ON_WORKSPACE.MEMBER)}>
                  <Row align='center' classes='gap-3'>
                    <div>
                      <Row gap={2} align='center'>
                        <div className='font-medium'>Member</div>
                        {
                          !workspace.isStandard &&
                          <div>
                            <div className="bg-[#e6e6e4] text-[#71706c] text-[9px] py-[2px] px-[6px] rounded-sm leading-none uppercase font-medium">
                              Standard plan
                            </div>
                          </div>
                        }
                      </Row>
                      <div className='text-[#787673] text-xs'>
                        Cannot change workspace settings or invite new members to the workspace.
                      </div>
                    </div>
                    {member.role === ROLE_USER_ON_WORKSPACE.MEMBER && <Icons.check className='text-2xl'/>}
                  </Row>
                </DropdownMenu.Item>
              </>
            }
            {
              // member.id === userOnWorkspace.user.id ?
              member.id === userOnWorkspace.user.id &&
              <DropdownMenu.Item
                className='text-red-400 focus:text-red-400 font-semibold'
                onClick={() => setEvent({ showDeleteAlert: true, userLeaveWorkspace: true })}
              >Leave workspace</DropdownMenu.Item>
            }
            {
              currentUserIsAdmin && member.id !== userOnWorkspace.user.id &&
              <DropdownMenu.Item
                className='text-red-400 focus:text-red-400 font-semibold'
                onClick={() => setEvent({ showDeleteAlert: true })}
              >
                Remove from workspace
              </DropdownMenu.Item>
            }
            {/*{*/}
            {/*  // member.id === userOnWorkspace.user.id ?*/}
            {/*  member.id === userOnWorkspace.user.id ?*/}
            {/*    <DropdownMenu.Item*/}
            {/*      className='text-red-400 focus:text-red-400 font-semibold'*/}
            {/*      onClick={() => setEvent({ showDeleteAlert: true, userLeaveWorkspace: true })}*/}
            {/*    >Leave workspace</DropdownMenu.Item>*/}
            {/*    :*/}
            {/*    <DropdownMenu.Item*/}
            {/*      className='text-red-400 focus:text-red-400 font-semibold'*/}
            {/*      onClick={() => setEvent({ showDeleteAlert: true })}*/}
            {/*    >*/}
            {/*      Remove from workspace*/}
            {/*    </DropdownMenu.Item>*/}
            {/*}*/}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>


      <Alert
        open={event.showUpdateRoleAlert}
        onOpenChange={(open) => setEvent({ showUpdateRoleAlert: open })}
      >
        <Alert.Content>
          <Alert.Header>
            <Alert.Title>Oops!</Alert.Title>
            <Alert.Description>A workspace must have at least 1 admin</Alert.Description>
          </Alert.Header>
          <Alert.Footer>
            <Alert.Action onClick={() => setEvent({ showUpdateRoleAlert: false })}>
              <Button variant='default'>Okay</Button>
            </Alert.Action>
          </Alert.Footer>
        </Alert.Content>
      </Alert>

      <Alert
        open={event.showDeleteAlert}
        onOpenChange={(open) => setEvent({ showDeleteAlert: open })}
      >
        {
          event.userLeaveWorkspace && workspace && workspace.totalMembers === 1 ?
            <Alert.Content>
              <Alert.Header>
                <Alert.Title>Oops!</Alert.Title>
                <Alert.Description>You cannot remove the last admin.</Alert.Description>
              </Alert.Header>
              <Alert.Footer>
                <Alert.Action onClick={() => setEvent({ showDeleteAlert: false })}>
                  <Button variant='default'>Okay</Button>
                </Alert.Action>
              </Alert.Footer>
            </Alert.Content>
            :
            <Alert.Content>
              <Alert.Header>
                <Alert.Title>
                  {
                    event.userLeaveWorkspace ? 'Are you sure you want to remove your own access?' :
                      'Are you sure you want to remove this person?'
                  }
                </Alert.Title>
                <Alert.Description>
                  {
                    event.userLeaveWorkspace ? 'You will lose access to the workspace, and any private pages will be lost.'
                      : 'They will lose access to the workspace, and any private notebooks will be lost.'
                  }
                </Alert.Description>
                {/*<Alert.Description>They will lose access to the workspace, and any private pages will be*/}
                {/*  lost.</Alert.Description>*/}
              </Alert.Header>
              <Alert.Footer>
                <Alert.Cancel>Cancel</Alert.Cancel>
                <Alert.Action onClick={handleDelete}>
                  <Button color='red' isLoading={event.isDeleteLoading}>Remove</Button>
                </Alert.Action>
              </Alert.Footer>
            </Alert.Content>
        }
      </Alert>
    </>
  )
}