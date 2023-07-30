import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

export const createNewComment = async (userId, postId, comment) => {
  if (!comment) {
    throw new Error('Comment is required...');
  }
  const newComment = new Comment({ text: comment, author: userId });
  await newComment.save();
  await Post.findByIdAndUpdate(postId, {
    $push: { comments: newComment._id },
  });
  return await newComment.populate('author');
};

export const removeComment = async (commentId, postId) => {
  const comment = await Comment.findByIdAndDelete(commentId);
  if (!comment) {
    throw new Error('Comment not found...');
  }
  await Post.findByIdAndUpdate(postId, {
    $pull: { comments: commentId },
  });
  return { message: 'Comment was successfully deleted...' };
};
