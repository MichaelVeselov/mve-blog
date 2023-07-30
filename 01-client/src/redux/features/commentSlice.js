import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const createComment = createAsyncThunk(
  '@@comment/createComment',
  async (commentData) => {
    const { postId } = commentData;
    try {
      const { data } = await axios.post(`/comments/${postId}`, commentData);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCommentsByPostId = createAsyncThunk(
  '@@comment/getCommentsByPostId',
  async (postId) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  '@@comment/deleteComment',
  async ({ commentId, postId }) => {
    try {
      const { data } = await axios.delete(`/comments/${commentId}`, {
        data: { postId },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  comments: [],
  loading: false,
};

export const commentSlice = createSlice({
  name: '@@comment',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload.newComment);
      })
      .addCase(getCommentsByPostId.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.commentList;
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload._id
        );
      });
  },
});

export const commentReducer = commentSlice.reducer;

export const selectComments = (state) => state.comment.comments;
export const selectCommentLoading = (state) => state.comment.loading;
