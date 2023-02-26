import { Button, Icons } from "core/components";
import { getCurrentUser } from "lib/session";
import Link from "next/link";
import FormsCreateWorkspace from "../../../components/dashboard/workspace/forms";

export default async function CreateWorkspacePage() {
  const user = await getCurrentUser()

  console.log('dauphaihau debug: user', user)
  return (
    <div className='mt-12 mx-auto px-4'>
      <div className='flex justify-between'>
        <div>
          <div>Logged is as:</div>
          <div>{user?.email}</div>
        </div>
        {/*<Button variant='text' color='gray' iconLeft={<Icons.arrowLeftSline/>}>Back to Camille</Button>*/}
        <Link href='/notebooks'>
          <Button variant='text' color='gray'>Back to Camille</Button>
        </Link>
      </div>

      <div className='max-w-md mx-auto mt-20 space-y-4'>
        <div className='text-center space-y-4'>
          <p className='block text-2xl'>Create a new workspace</p>
          <p className='block text-[#6b6f76] text-base'>Workspaces are shared environments where teams can work on
            projects, cycles and tasks.</p>
        </div>
        <FormsCreateWorkspace/>
      </div>

    </div>
  );
}
