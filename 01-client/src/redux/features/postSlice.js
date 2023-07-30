import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const createPost = createAsyncThunk(
  '@@post/createPost',
  async (postData) => {
    try {
      const { data } = await axios.post('/posts', postData);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPosts = createAsyncThunk('@@post/getAllPosts', async () => {
  try {
    const { data } = await axios.get('/posts');
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deletePost = createAsyncThunk(
  '@@post/deletePost',
  async (postId) => {
    try {
      const { data } = await axios.delete(`/posts/${postId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updatePost = createAsyncThunk(
  '@@post/updatePost',
  async (updateData) => {
    const { postData, postId } = updateData;
    try {
      const { data } = await axios.put(`/posts/${postId}`, postData);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
};

export const postSlice = createSlice({
  name: '@@post',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload.newPost);
      })
      .addCase(getAllPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.popularPosts = action.payload.popularPosts;
      })
      .addCase(deletePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload._id
        );
      })
      .addCase(updatePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload.post._id
        );
        state.posts[index] = action.payload.post;
      });
  },
});

export const postReducer = postSlice.reducer;

export const selectAllPosts = (state) => state.post.posts;
export const selectPopularPosts = (state) => state.post.popularPosts;
export const selectPostLoading = (state) => state.post.loading;
