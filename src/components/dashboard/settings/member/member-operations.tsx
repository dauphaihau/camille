"use client"

import { useRouter } from "next/navigation"
import { useReducer } from "react"
import * as React from "react";
import { User, UserOnWorkspace } from "@prisma/client"

import { DropdownMenu, toast, Button, Icons, Row } from "core/components"
import { Alert } from "core/components/alert"
import { cn } from "core/helpers";
import { PATH, ROLE_USER_ON_WORKSPACE } from "config/const";
import { deleteMember, memberLeave, updateRoleMember } from "lib/request-by-swr/settings-member";
import { LoadingDialog } from "components/dialog/loading-dialog";
import { useStoreMulti } from "lib/store";

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
  isUpdateLoading: false,
  userLeaveWorkspace: false,
}

export function MemberOperations({ member, members, currentUserIsAdmin }: MemberOperationsProps) {
  const router = useRouter()
  const { user, workspace } = useStoreMulti('user', 'workspace')
  const [event, setEvent] = useReducer((prev, next) => ({
    ...prev, ...next
  }), initialState)

  if (!user.userOnWorkspace || !workspace || !user) {
    return null
  }

  async function handleDelete() {
    if (workspace && member) {
      setEvent({ isDeleteLoading: true })
      let response;
      if (event.userLeaveWorkspace && user.userOnWorkspace) {
        response = await memberLeave()
      } else {
        response = await deleteMember(member.id)
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
          message: "Something went wrong, please try again.",
          type: "error",
        })
      }

      setEvent({ showDeleteAlert: false })

      // // redirect first workspace in list workspaces user can access
      if (event.userLeaveWorkspace) {
        if (response?.data?.workspace?.domain) {
          return router.push(`/${response.data.workspace.domain}`)
        }
        // setEvent({ userLeaveWorkspace: false })
        return router.push(PATH.WORKSPACE)
      }

      router.refresh()
    }
  }

  async function handleUpdateRole(role) {
    if (!workspace || member.role === role || !user) return

    setEvent({ isUpdateLoading: true })
    if (role === ROLE_USER_ON_WORKSPACE.MEMBER) {
      if (member.id === user.id) {
        const admins = members.filter((m) => m.role === ROLE_USER_ON_WORKSPACE.ADMIN)
        if (admins.length === 1) return setEvent({ showUpdateRoleAlert: open })
      }
    }

    if (!workspace.isStandard) {
      return router.push(`/${workspace.domain}/settings/plans`)
    }

    if (workspace && member) {
      setEvent({ isDeleteLoading: true })
      const response = await updateRoleMember({ userId: member.id, workspaceId: workspace.id, role })
      setEvent({ isDeleteLoading: false })

      if (response.code !== '200') {
        return toast({
          title: "Something went wrong.",
          message: "Your member was not update. Please try again.",
          type: "error",
        })
      }
      setEvent({ isUpdateLoading: true })
      router.refresh()
    }
  }

  return (
    <>
      <LoadingDialog open={event.isDeleteLoading} message={'Updating...'}/>
      <DropdownMenu
        open={event.showDropdown}
        onOpenChange={(open) => setEvent({ showDropdown: open })}
      >
        <DropdownMenu.Trigger disabled={!currentUserIsAdmin && user.id !== member.id}>
          <Icons.ellipsisHorizontal
            size={12}
            className={cn('btn-icon group-hover/member:visible text-[#686662]')}
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
                            <div className="bg-[#e6e6e4] text-[#71706c] text-[9px] py-0.5 px-[6px] rounded-sm leading-none uppercase font-medium">
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
              // member.id === userOnWorkspace.user.id &&
              member.id === user.id &&
              <DropdownMenu.Item
                className='text-red-400 focus:text-red-400 font-semibold'
                onClick={() => setEvent({ showDeleteAlert: true, userLeaveWorkspace: true })}
              >Leave workspace</DropdownMenu.Item>
            }

            {
              currentUserIsAdmin && member.id !== user.id &&
              <DropdownMenu.Item
                className='text-red-400 focus:text-red-400 font-semibold'
                onClick={() => setEvent({ showDeleteAlert: true })}
              >
                Remove from workspace
              </DropdownMenu.Item>
            }
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
                <Alert.Description>A workspace must have at least 1 admin</Alert.Description>
                {/*<Alert.Description>You cannot remove the last admin.</Alert.Description>*/}
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
