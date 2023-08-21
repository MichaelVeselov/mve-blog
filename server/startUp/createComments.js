import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import mockComments from '../mock/mockComments.js';

const createComments = async (users, posts) => {
  await Comment.collection.drop();

  const comments = mockComments();

  await users.forEach((userId, i) => {
    posts.forEach(async (postId) => {
      const newComment = new Comment({
        text: comments[i].text,
        author: userId,
      });
      await newComment.save();
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    });
  });
};

export default createComments;
