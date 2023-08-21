import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import mockUsers from '../mock/mockUsers.js';

const createUsers = async () => {
  await User.collection.drop();

  const users = mockUsers();

  return Promise.all(
    users.map(async (user) => {
      try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        const { firstName, lastName, email, avatarUrl } = user;

        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hash,
          avatarUrl,
        });
        await newUser.save();

        return newUser._id;
      } catch (error) {
        return error.message;
      }
    })
  );
};

export default createUsers;
