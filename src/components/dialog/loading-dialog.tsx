'use client';

import { Dialog, Loading, Row } from 'core/components';

interface LoadingDialogProps {
  open: boolean
  message: string
}

export function LoadingDialog({ open, message }: LoadingDialogProps) {
  return (
    <Dialog open={ open }>
      <Dialog.Content
        className='!w-fit py-3'
        // classesOverlay='opacity-90'
      >
        <Row
          align='center'
          gap={ 1 }
        >
          <div className='text-[#80807c] text-sm'>
            { message }
          </div>
          <Loading />
        </Row>
      </Dialog.Content>
    </Dialog>
  );
}
