import { Button, Icons } from "core/components";
import Link from "next/link";
import { PATH } from "config/const";

export default function HomePage() {
  return (
    <div className='py-28 max-w-lg mx-auto text-center'>
      <h1 className='text-5xl mb-4 px-12'>
        The simplest way to keep notes
      </h1>
      <h5 className='text-xl'>
        Remember everything and tackle any project with your notes, tasks, and schedule all in one place.
      </h5>
      <Link href={PATH.LOGIN}>
        <Button
          size='md'
          classes='mt-6'
          iconRight={<Icons.arrowRight className='h-4 w-4'/>}
        >
          Get start for free
        </Button>
      </Link>
    </div>
  );
}
