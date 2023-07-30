import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import _ from 'lodash';
import { unlink } from 'fs/promises';

export const createNewPost = async (title, text, userId, files) => {
  let newPost;
  if (files) {
    let fileName =
      userId + '_' + Date.now().toString() + '_' + files.image.name;
    const __dirname = dirname(fileURLToPath(import.meta.url));
    files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
    newPost = new Post({
      title,
      text,
      imgUrl: fileName,
      author: userId,
    });
    await newPost.save();
    await User.findByIdAndUpdate(userId, {
      $push: { posts: newPost },
    });
  } else {
    newPost = new Post({
      title,
      text,
      imgUrl: '',
      author: userId,
    });
    await newPost.save();
    await User.findByIdAndUpdate(userId, {
      $push: { posts: newPost },
    });
  }
  return newPost;
};

export const getPosts = async () => {
  const posts = await Post.find().populate('author').sort('-createdAt');
  const popularPosts = await Post.find()
    .populate('author')
    .limit(5)
    .sort('-views');

  if (!posts) {
    throw new Error('Posts not found...');
  }

  return { posts, popularPosts };
};

export const getSinglePost = async (postId) => {
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $inc: { views: 1 },
    },
    {
      returnDocument: 'after',
    }
  ).populate('author');
  return post;
};

export const getPostsByUser = async (userId) => {
  const user = await User.findById(userId);
  const posts = await Promise.all(
    user.posts.map((post) => {
      return Post.findById(post._id).populate('author');
    })
  );

  return _.orderBy(posts, ['updatedAt'], ['desc']);
};

export const removePost = async (postId, userId) => {
  const post = await Post.findByIdAndDelete(postId);

  if (!post) {
    throw new Error('Post not found...');
  }

  await User.findByIdAndUpdate(userId, {
    $pull: { posts: postId },
  });

  await Promise.all(
    post.comments.map((comment) => {
      return Comment.findByIdAndDelete(comment);
    })
  );

  if (post.imgUrl) {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const file = path.join(__dirname, '..', 'uploads', post.imgUrl);
    await unlink(file);
  }
};

export const editPost = async (userId, postId, title, text, image, files) => {
  const post = await Post.findById(postId);

  if (files) {
    if (post.imgUrl) {
      const __dirname = dirname(fileURLToPath(import.meta.url));
      const file = path.join(__dirname, '..', 'uploads', post.imgUrl);
      await unlink(file);
    }

    let fileName =
      userId + '_' + Date.now().toString() + '_' + files.image.name;
    const __dirname = dirname(fileURLToPath(import.meta.url));
    files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

    post.imgUrl = fileName;
    post.title = title;
    post.text = text;
  }

  if (!files && image === '') {
    if (post.imgUrl === image) {
      post.imgUrl = image;
      post.title = title;
      post.text = text;
    } else {
      const __dirname = dirname(fileURLToPath(import.meta.url));
      const file = path.join(__dirname, '..', 'uploads', post.imgUrl);
      await unlink(file);

      post.imgUrl = image;
      post.title = title;
      post.text = text;
    }
  }

  if (!files && image !== '') {
    post.imgUrl = image;
    post.title = title;
    post.text = text;
  }

  await post.save();

  return post;
};

export const getCommentsByPost = async (postId) => {
  const post = await Post.findById(postId);
  const commentList = await Promise.all(
    post.comments.map((comment) => {
      return Comment.findById(comment).populate('author');
    })
  );
  return commentList;
};
