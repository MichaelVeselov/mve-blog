import User from '../models/User.js';
import mockUsers from '../mock/mockUsers.js';

import createUsers from './createUsers.js';
import createPosts from './createPosts.js';
import createComments from './createComments.js';

const initDatabase = async () => {
  const usersDb = await User.find();
  const usersMock = mockUsers();

  if (usersDb.length !== usersMock.length) {
    const users = await createUsers();
    const posts = await createPosts(users);
    await createComments(users, posts);
  }
};

export default initDatabase;
