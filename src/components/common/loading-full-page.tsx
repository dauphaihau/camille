import { Loading } from 'core/components';

export default function LoadingFullPage() {
  return (
    <div className='grid place-items-center h-screen'>
      <Loading className='h-6 w-6' />
    </div>
  );
}
