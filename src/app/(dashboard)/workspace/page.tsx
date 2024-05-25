import { getCurrentUser } from 'lib/session';
import CreateWorkspaceForm from 'components/dashboard/workspace/create-workspace-form';
import BackButton from 'components/dashboard/workspace/back-button';
import { Box, Col, Row } from 'core/components';

export default async function CreateWorkspacePage() {
  const user = await getCurrentUser();

  return (
    <Box classes='mt-8 mx-auto px-6'>
      <Row justify='between'>
        <Col>
          <p className='text-xs text-zinc-500'>Logged is as:</p>
          <p className='text-sm'>{ user?.email }</p>
        </Col>
        { user?.workspaceLastVisited && user.workspaceLastVisited && <BackButton /> }
      </Row>

      <Box classes='max-w-md mx-auto mt-20 space-y-4'>
        <Box classes='text-center space-y-4'>
          <h3 className='font-normal'>Create a new workspace</h3>
          <p className='text-[#6b6f76] text-sm'>
            Workspaces are shared environments where teams can work on
            projects, cycles and tasks.
          </p>
        </Box>
        <CreateWorkspaceForm />
      </Box>
    </Box>
  );
}
