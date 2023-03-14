'use client'

import React, { useState } from "react";
// import { redirect } from "next/navigation"
import { Button } from "core/components";
import { toast } from "../../../core/components/Toast";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { deleteWorkspace } from "../../../services/notebook";

export default function DeleteWorkspaceButton({ user, workspaceId }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  async function deleteWorkspace() {
    setIsLoading(true)
    const response = await fetch(`/api/settings/workspace/${workspaceId}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json", },
      // body: JSON.stringify(values)
    })
    setIsLoading(false)

    if (!response?.ok) {

      if (response.status === 409) {
        return toast({
          title: "Domain exists",
          message: "Create workspace failed. Please try again.",
          type: "error",
        })
      }

      // methods.setError('domain', { type: 'custom', message: 'Domain exists' })
      // console.log('dauphaihau debug: methods-form-state-errors', methods.formState.errors)

      return toast({
        title: "Something went wrong.",
        message: "Create workspace failed. Please try again.",
        type: "error",
      })
    }

    await getSession()

    router.refresh()
    router.push(`/${user.workspaces[0].domain}`)

    return toast({
      title: "Delete workspace",
      message: "Your workspace was deleted success",
      type: "success",
    })

  }

  return (
    <Button isLoading={isLoading} color='red' onClick={deleteWorkspace}>Delete this workspace</Button>
  );
}
