'use client'
import { useRouter } from "next/navigation";
import { Box, Button, Row, Text } from "core/components";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter()
  return (
    <Box classes='mx-auto px-6'>
      <Row justify='start' align={'center'} classes='h-[80px]'>
        <Link href={'/'} className={'text-base font-semibold'}>
          Camille
        </Link>
      </Row>

      <Box classes='max-w-md mx-auto mt-[15rem] space-y-4 h-full'>
        <Box classes='text-center space-y-4'>
          <Text h3 classes='font-normal'>This content does not exist</Text>
          <div className='mx-auto'>
            <Button onClick={() => router.back()}>Back to my content</Button>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
