import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (
  firstName,
  lastName,
  email,
  password,
  avatarUrl
) => {
  const candidate = await User.findOne({ email });
  if (candidate) {
    throw new Error('Such a user already exists...');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hash,
    avatarUrl,
  });

  await user.save();

  const { password: passwordHash, ...userData } = user._doc;

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { userData, token };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Incorrect user or password...');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error('Incorrect user or password...');
  }

  const { password: passwordHash, ...userData } = user._doc;

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { userData, token };
};

export const getProfileUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('Incorrect user or password...');
  }

  const { password: passwordHash, ...userData } = user._doc;

  return userData;
};
