'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Box, Button, Row } from 'core/components';

export default function NotFound() {
  const router = useRouter();
  return (
    <Box classes='mx-auto px-6'>
      <Row
        justify='start' align='center'
        classes='h-[80px]'
      >
        <Link href='/' className='text-base font-semibold'>
          Camille
        </Link>
      </Row>

      <Box classes='max-w-md mx-auto mt-[15rem] space-y-4 h-full'>
        <Box classes='text-center space-y-4'>
          <h3 className='font-normal'>This content does not exist</h3>
          <div className='mx-auto'>
            <Button onClick={ () => router.back() }>Back to my content</Button>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
