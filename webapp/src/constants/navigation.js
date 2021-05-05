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
    id: 'friends',
    icon: '/img/icon/friends.png',
    label: 'navBar.friends',
    to: '/friends'
  }
];

export const ProfileOptions = [
  {
    label: 'navBar.logOut',
    onClick: 'logOut',
    icon: 'lock'
  }
];
