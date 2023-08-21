import { Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NavBar } from './NavBar';

export const Layout = () => {
  return (
    <>
      <div className='container mx-auto'>
        <NavBar />
        <main>
          <Outlet />
        </main>
      </div>
      <ToastContainer position='bottom-right' />
    </>
  );
};
