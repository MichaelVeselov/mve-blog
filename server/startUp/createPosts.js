import { readdir, unlink, copyFile } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import Post from '../models/Post.js';
import User from '../models/User.js';
import mockPosts from '../mock/mockPosts.js';

async function deleteAllFilesInDir(dirPath) {
  try {
    const files = await readdir(dirPath);

    const deleteFilePromises = files.map((file) =>
      unlink(path.join(dirPath, file))
    );

    await Promise.all(deleteFilePromises);
  } catch (err) {
    console.log(err);
  }
}

const createPosts = async (users) => {
  await Post.collection.drop();

  const posts = mockPosts();

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const sourcePath = path.join(__dirname, '..', 'mock');
  const destPath = path.join(__dirname, '..', 'uploads');
  await deleteAllFilesInDir(destPath);

  return Promise.all(
    posts.map(async (post, i) => {
      let userId;
      if (i < 7) {
        userId = users[0];
      } else {
        userId = users[1];
      }

      let newPost;
      const { title, text, image } = post;

      if (image) {
        const fileName =
          userId + '_' + Date.now().toString() + '_' + image.match(/[^\/]+$/);
        copyFile(path.join(sourcePath, image), path.join(destPath, fileName));
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
        return newPost._id;
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
        return newPost._id;
      }
    })
  );
};

export default createPosts;
