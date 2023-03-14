'use client'

import { useRouter } from "next/navigation";
import { Button } from "core/components";

export default function BackButton() {
  const router = useRouter()
  return (
    <Button
      variant='text' color='gray'
      onClick={() => {
        router.back()
      }}
    >Back to Camille</Button>
  );
}
