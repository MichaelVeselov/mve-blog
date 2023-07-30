import {
  createNewPost,
  getPosts,
  getSinglePost,
  getPostsByUser,
  removePost,
  editPost,
  getCommentsByPost,
} from '../services/PostService.js';

export const createPost = async (request, response) => {
  try {
    const { userId, files } = request;
    const { title, text } = request.body;
    const newPost = await createNewPost(title, text, userId, files);
    response.json({ newPost, message: 'New post was successfully created...' });
  } catch (error) {
    response.json({ message: 'An error occurred when creating a new post...' });
  }
};

export const getAllPosts = async (request, response) => {
  try {
    const { posts, popularPosts } = await getPosts();
    response.json({
      posts,
      popularPosts,
      message: 'All posts were successfully found...',
    });
  } catch (error) {
    response.json({ message: 'An error occurred when searching posts...' });
  }
};

export const getPostByPostId = async (request, response) => {
  try {
    const postId = request.params.id;
    const post = await getSinglePost(postId);
    response.json({ post, message: 'Post was successfully found...' });
  } catch (error) {
    response.json({ message: 'An error occurred when searching post...' });
  }
};

export const getPostsByUserId = async (request, response) => {
  try {
    const { userId } = request;
    const posts = await getPostsByUser(userId);
    response.json({
      posts,
      message: 'All user posts were successfully found...',
    });
  } catch (error) {
    response.json({
      message: 'An error occurred when searching user posts...',
    });
  }
};

export const deletePost = async (request, response) => {
  try {
    const postId = request.params.id;
    const { userId } = request;
    const { message } = await removePost(postId, userId);
    response.json({ _id: postId, message: 'Post was successfully deleted...' });
  } catch (error) {
    response.json({ message: 'An error occurred when deleting a post...' });
  }
};

export const updatePost = async (request, response) => {
  try {
    const { userId, files } = request;
    const postId = request.params.id;
    const { title, text, image = '' } = request.body;
    const post = await editPost(userId, postId, title, text, image, files);
    response.json({ post, message: 'Post was succsessfully updated...' });
  } catch (error) {
    response.json({ message: 'An error occurred when updating a post...' });
  }
};

export const getCommentsByPostId = async (request, response) => {
  try {
    const postId = request.params.id;
    const commentList = await getCommentsByPost(postId);
    response.json({
      commentList,
      message: 'All comments were successfully found...',
    });
  } catch (error) {
    response.json({ message: 'An error occurred when searching comments...' });
  }
};
