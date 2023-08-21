const mockUsers = () => [
  {
    firstName: 'Kingsley',
    lastName: 'Harper',
    email: 'blogger-01@mve-blog.com',
    password: 'Admin9876',
    avatarUrl: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
      .toString(36)
      .substring(7)}.svg`,
  },
  {
    firstName: 'Pippa',
    lastName: 'Becker',
    email: 'blogger-02@mve-blog.com',
    password: 'Admin9876',
    avatarUrl: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
      .toString(36)
      .substring(7)}.svg`,
  },
  {
    firstName: 'Darren',
    lastName: 'Butler',
    email: 'blogger-03@mve-blog.com',
    password: 'Admin9876',
    avatarUrl: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
      .toString(36)
      .substring(7)}.svg`,
  },
];

export default mockUsers;
