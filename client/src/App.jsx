import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { getProfile } from './redux/features/authSlice';
import { getAllPosts } from './redux/features/postSlice';

import { routes } from './routes';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getAllPosts());
    // eslint-disable-next-line
  }, []);

  const router = createBrowserRouter(routes());
  return <RouterProvider router={router} />;
}

export default App;
