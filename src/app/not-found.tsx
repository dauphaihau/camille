'use client'
import { useRouter } from "next/navigation";
import { Box, Button, Row, Text } from "core/components";

export default function NotFound() {
  const router = useRouter()
  return (
    <Box classes='mt-8 mx-auto px-6'>
      <Row justify='start' classes='h-[80px]'>
        <Text size={16} weight='semibold'>Camille</Text>
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
