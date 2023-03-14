import { getCurrentUser } from "lib/session";
import FormCreateWorkspace from "components/dashboard/workspace/form-create-workspace";
import BackButton from "components/dashboard/workspace/back-button";

export default async function CreateWorkspacePage() {
  const user = await getCurrentUser()

  return (
    <div className='mt-12 mx-auto px-4'>
      <div className='flex justify-between'>
        <div>
          <div>Logged is as:</div>
          <div>{user?.email}</div>
        </div>
        <BackButton/>
      </div>

      <div className='max-w-md mx-auto mt-20 space-y-4'>
        <div className='text-center space-y-4'>
          <div className='text-2xl'>Create a new workspace</div>
          <div className='text-[#6b6f76] text-base'>Workspaces are shared environments where teams can work on
            projects, cycles and tasks.</div>
        </div>
        <FormCreateWorkspace/>
      </div>

    </div>
  );
}
