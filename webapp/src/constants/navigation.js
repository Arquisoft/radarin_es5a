/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'home',
    icon: '/img/icon/apps.svg',
    label: 'navBar.home',
    to: '/welcome'
  },
  {
    id: 'map',
    icon: '/img/icon/apps.svg',
    label: 'navBar.map',
    to: '/map'
  },
  {
    id: 'chat',
    icon: '/img/icon/apps.svg',
    label: 'navBar.chat',
    to: '/chat'
  },
  {
    id: 'options',
    icon: '/img/icon/apps.svg',
    label: 'navBar.options',
    to: '/options'
  }
];

export const ProfileOptions = [
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
