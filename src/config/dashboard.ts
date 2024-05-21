import { DashboardConfig } from 'types';

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Support',
      href: '/support',
      disabled: true,
    },
  ],
  sidebarNav: [
    // {
    //   title: "Pages",
    //   href: "/",
    //   icon: "page",
    //   disabled: true,
    // },
    // {
    //   title: "Media",
    //   href: "/",
    //   icon: "media",
    //   disabled: true,
    // },
    {
      title: 'Search',
      href: '',
      icon: 'search',
    },
    {
      title: 'Billing',
      href: '/dashboard/billing',
      icon: 'billing',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    },
    {
      title: 'Notebooks',
      href: '/dashboard/notebooks',
      icon: 'post',
    },
  ],
};
