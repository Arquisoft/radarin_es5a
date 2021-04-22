/**
 * Object mapping of known possible inboxes for the user
 */
export const NavigationItems = [
  {
    id: 'home',
    icon: '/img/icon/home.png',
    label: 'navBar.home',
    to: '/welcome'
  },
  {
    id: 'map',
    icon: '/img/icon/map.png',
    label: 'navBar.map',
    to: '/map'
  },
  {
    id: 'chat',
    icon: '/img/icon/chat.png',
    label: 'navBar.chat',
    to: '/chat'
  },
  {
    id: 'friends',
    icon: '/img/icon/friends.png',
    label: 'navBar.friends',
    to: '/friends'
  },
  {
    id: 'options',
    icon: '/img/icon/options.png',
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
