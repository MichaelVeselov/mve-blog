import { body } from 'express-validator';

export const registerValidation = [
  body('firstName', 'Name must be at least 2 characters long...').isLength({
    min: 2,
  }),
  body('lastName', 'Name must be at least 2 characters long...').isLength({
    min: 2,
  }),
  body('email', 'Invalid email format...').isEmail(),
  body('password', 'Password must be at least 5 characters long...').isLength({
    min: 5,
  }),
  body('avatarUrl', 'Invalid avatar URL...').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Invalid email format...').isEmail(),
  body('password', 'Password must be at least 5 characters long...').isLength({
    min: 5,
  }),
];

export const postCreateValidation = [
  body('title', 'Post title must be at least 3 characters long...')
    .isLength({ min: 3 })
    .isString(),
  body('text', 'Post text must be at least 3 characters long...')
    .isLength({ min: 3 })
    .isString(),
  body('imageUrl', 'Invalid image URL...').optional().isString(),
];

export const commentCreateValidation = [
  body('text', 'Comment text must be at least 3 characters long...')
    .isLength({ min: 3 })
    .isString(),
];
