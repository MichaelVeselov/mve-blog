import jwt from 'jsonwebtoken';

export const checkAuth = (request, response, next) => {
  const token = (request.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded =
        jwt.verify(token, process.env.JWT_ACCESS_SECRET) ||
        jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      request.userId = decoded.id;
      next();
    } catch (error) {
      return response.json({
        message: 'Permission denied...',
      });
    }
  } else {
    return response.json({
      message: 'Permission denied...',
    });
  }
};
