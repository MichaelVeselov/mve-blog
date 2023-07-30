import { createNewComment, removeComment } from '../services/CommentService.js';

export const createComment = async (request, response) => {
  try {
    const { userId } = request;
    const { postId, comment } = request.body;
    const newComment = await createNewComment(userId, postId, comment);
    response.json({
      newComment,
      message: 'New comment created successfully...',
    });
  } catch (error) {
    response.json({ message: 'An error occurred when creating a comment...' });
  }
};

export const deleteComment = async (request, response) => {
  try {
    const commentId = request.params.id;
    const { postId } = request.body;
    const { message } = await removeComment(commentId, postId);
    response.json({ _id: commentId, message });
  } catch (error) {
    response.json({ message: 'An error occurred when deleting a comment...' });
  }
};
