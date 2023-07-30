import User from '../models/User.js';

import {
  createUser,
  loginUser,
  getProfileUser,
} from '../services/AuthService.js';

export const registration = async (request, response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      avatarUrl = '',
    } = request.body;

    const { userData, token } = await createUser(
      firstName,
      lastName,
      email,
      password,
      avatarUrl
    );

    response.json({
      userData,
      token,
      message: 'You have successfully registered...',
    });
  } catch (error) {
    response.json({ message: 'Registration failed...' });
  }
};

export const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    const { userData, token } = await loginUser(email, password);

    response.json({
      userData,
      token,
      message: 'You have successfully logged on...',
    });
  } catch (error) {
    response.json({ message: 'Authorization failed...' });
  }
};

export const getProfile = async (request, response) => {
  try {
    const { userId } = request;
    const userData = await getProfileUser(userId);
    response.json({
      userData,
    });
  } catch (error) {
    response.json({ message: 'Permission denied...' });
  }
};
