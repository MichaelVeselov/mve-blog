import { Router } from 'express';

import {
  createPost,
  getAllPosts,
  getPostByPostId,
  getPostsByUserId,
  deletePost,
  updatePost,
  getCommentsByPostId,
} from '../controllers/PostController.js';
import { checkAuth } from '../middleware/checkAuth.js';

const router = new Router();

router.post('/', checkAuth, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostByPostId);
router.get('/user/own-posts', checkAuth, getPostsByUserId);
router.delete('/:id', checkAuth, deletePost);
router.put('/:id', checkAuth, updatePost);
router.get('/comments/:id', getCommentsByPostId);

export default router;
