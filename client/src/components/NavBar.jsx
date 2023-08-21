import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { logOut, selectCurrentUser } from '../redux/features/authSlice';

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);

  const activeStyle = {
    color: 'white',
  };

  const handleLogOut = async () => {
    try {
      await dispatch(logOut());
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
      window.localStorage.removeItem('expires');
      toast('You are logged out...');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex py-4 justify-between items-center'>
      <Link to='/'>
        <span className='flex justify-center items-center px-4 py-2 bg-gray-600 text-xs text-white rounded-sm'>
          MVE Blog
        </span>
      </Link>

      {currentUser && (
        <ul className='flex gap-8'>
          <li>
            <NavLink
              to='/'
              className='text-xs text-gray-400 hover:text-white'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Main page
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/posts'
              end
              className='text-xs text-gray-400 hover:text-white'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Own posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/add-post'
              className='text-xs text-gray-400 hover:text-white'
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Add a post
            </NavLink>
          </li>
        </ul>
      )}

      <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
        {currentUser ? (
          <div className='flex gap-2 justify-end'>
            <button onClick={handleLogOut}>Logout</button>
            <img
              src={
                currentUser?.avatarUrl ||
                'https://avatars.dicebear.com/api/avataaars/jysg6.svg'
              }
              className='w-5 rounded-full'
              alt='Avatar'
            />
          </div>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </div>
    </div>
  );
};
