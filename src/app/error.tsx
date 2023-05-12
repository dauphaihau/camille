'use client'; // Error components must be Client components

import { useEffect } from 'react';
import { Box, Button, Row, Text } from "../core/components";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Box classes='mx-auto px-6'>
      <Box classes='max-w-lg mx-auto mt-[15rem] space-y-4 h-full'>
        <Box classes='text-center space-y-4'>
          <Text h3 classes='font-normal'>Oops, there was an error loading this page</Text>
          <Text h3 classes='font-normal'>Refresh to load it again</Text>
          <div className='mx-auto'>
            <Button
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
            >Refresh</Button>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
