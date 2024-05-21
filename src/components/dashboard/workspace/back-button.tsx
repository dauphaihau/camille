'use client';

import { useRouter } from 'next/navigation';
import { Button, Icons } from 'core/components';

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      iconLeft={ <Icons.arrowLeftSline /> }
      variant='text' color='gray'
      size='sm'
      // size='xs'
      onClick={ () => {
        router.back();
      } }
    >Back to Camille
    </Button>
  );
}
