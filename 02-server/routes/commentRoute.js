import { Router } from 'express';

import {
  createComment,
  deleteComment,
} from '../controllers/CommentController.js';
import { checkAuth } from '../middleware/checkAuth.js';

const router = new Router();

router.post('/:id', checkAuth, createComment);
router.delete('/:id', deleteComment);

export default router;
