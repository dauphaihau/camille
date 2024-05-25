// import { redirect } from 'next/navigation';
// import { PATH } from 'config/const';
// import { getTrackingUserByWorkspace } from 'services/server-actions/user';
// import { DashboardSlugs } from 'types/workspace';
// import { getCurrentUser } from 'lib/session';

// interface DashboardPageProps {
//   params: DashboardSlugs;
// }

export default async function DashboardPage(
  // { params }: DashboardPageProps
) {
  // const user = await getCurrentUser();
  // if (user) {
  //   if (!user.workspaceLastVisited) {
  //     redirect(PATH.WORKSPACE);
  //   }
  //   const response = await getTrackingUserByWorkspace(user.workspaceLastVisited.id);
  //
  //   const domain = user.workspaceLastVisited.domain;
  //
  //   if (response?.data?.lastAccessPageId) {
  //     redirect(`/${domain}/${response.data.lastAccessPageId}`);
  //   }
  //   redirect(`/${domain}`);
  // }
}
