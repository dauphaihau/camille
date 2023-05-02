"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Teamspace } from "@prisma/client"

import { DropdownMenu } from "core/components/dropdown"
import { Button, Icons, Tooltip } from "core/components"
import { Alert } from "core/components/alert"
import { toast } from "core/components/Toast"
import { useState } from "react"
import { cn } from "core/helpers";
import { archived } from "lib/request/teamspace";
import { ARCHIVED_TEAMSPACE } from "config/const";

interface TeamspaceOperations {
  teamspace: Pick<Teamspace, "id">
}

export function TeamspaceOperations({ teamspace }: TeamspaceOperations) {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isArchivingLoading, setIsArchivingLoading] = useState<boolean>(false)

  async function archivedTeamspace() {
    setIsArchivingLoading(true)
    const response = await archived(teamspace.id, ARCHIVED_TEAMSPACE.SOFT_DELETE)

    // if (!response?.ok) {
    //   toast({
    //     title: "Something went wrong.",
    //     message: "Your teamspace was not archived. Please try again.",
    //     type: "error",
    //   })
    // }

    setIsArchivingLoading(false)

    if (response.code === '200') {
      setShowDeleteAlert(false)
      router.refresh()
    }

    toast({
      type: "success",
      message: response.message
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <Tooltip>
            <Tooltip.Trigger asChild>
              <div>
                <Icons.ellipsisHorizontal
                  size={12}
                  className={cn('btn-icon group-hover/teamspace:visible  invisible',
                  )}
                />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <div>Teamspace settings and members</div>
            </Tooltip.Content>
          </Tooltip>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={cn('absolute w-[265px] top-0 left-[-1rem]',
            )}
          >
            <DropdownMenu.Item>Teamspace settings</DropdownMenu.Item>
            <DropdownMenu.Item>Add members</DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => setShowDeleteAlert(true)}>
              <div className={'hover:text-red-600'}>Archive teamspace</div>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>
      <Alert open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <Alert.Content>
          <Alert.Header>
            <Alert.Title>
              Are you sure you want to archive this teamspace?
            </Alert.Title>
            <Alert.Description>Archiving this teamspace will remove access and hide it in the sidebar for all teamspace
              members. Type the teamspace name to confirm.</Alert.Description>
          </Alert.Header>
          <Alert.Footer>
            <Alert.Cancel>Cancel</Alert.Cancel>
            <Alert.Action onClick={archivedTeamspace}>
              <Button isLoading={isArchivingLoading} color='red'>Archive teamspace</Button>
            </Alert.Action>
          </Alert.Footer>
        </Alert.Content>
      </Alert>
    </>
  )
}
