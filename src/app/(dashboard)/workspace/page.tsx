import { getCurrentUser } from "lib/session";
import FormCreateWorkspace from "components/dashboard/workspace/form-create-workspace";
import BackButton from "components/dashboard/workspace/back-button";
import { Box, Col, Row, Text } from "core/components";

export default async function CreateWorkspacePage() {
  const user = await getCurrentUser()

  return (
    <Box classes='mt-8 mx-auto px-6'>
      <Row justify='between'>
        <Col>
          <Text classes='text-xs text-[#6b6f7c]'>Logged is as:</Text>
          <Text size={13}>{user?.email}</Text>
        </Col>
        {user?.workspaceLastVisited && user.workspaceLastVisited && <BackButton/>}
      </Row>

      <Box classes='max-w-md mx-auto mt-20 space-y-4'>
        <Box classes='text-center space-y-4'>
          <Text h3 classes='font-normal'>Create a new workspace</Text>
          <Text classes='text-[#6b6f76] text-[15px]'>Workspaces are shared environments where teams can work on
            projects, cycles and tasks.</Text>
        </Box>
        <FormCreateWorkspace/>
      </Box>
    </Box>
  );
}
