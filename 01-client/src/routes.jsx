import { Navigate } from 'react-router-dom';

import { Layout } from './components/Layout';
import { MainPage } from './pages/MainPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { AddPostPage } from './pages/AddPostPage';
import { PostPage } from './pages/PostPage';
import { SinglePostPage } from './pages/SinglePostPage';
import { EditPostPage } from './pages/EditPostPage';
import { ErrorPage } from './pages/ErrorPage';

export const routes = () => [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'add-post',
        element: <AddPostPage />,
      },
      {
        path: 'posts',
        element: <PostPage />,
      },
      {
        path: 'posts/:postId',
        element: <SinglePostPage />,
      },
      {
        path: 'posts/:postId/edit',
        element: <EditPostPage />,
      },
      { path: '*', element: <Navigate to='/' /> },
    ],
  },
];
