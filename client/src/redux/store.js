import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './features/authSlice';
import { postReducer } from './features/postSlice';
import { commentReducer } from './features/commentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    comment: commentReducer,
  },
  devTools: true,
  middleware: (getDeafaultMiddleware) =>
    getDeafaultMiddleware({
      serializableCheck: false,
    }),
});
