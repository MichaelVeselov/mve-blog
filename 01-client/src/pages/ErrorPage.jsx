import { Link, useRouteError } from 'react-router-dom';
import img from '../assets/error.gif';

export const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className='min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10'>
      <img
        src={img}
        alt='error 404'
        className='block w-64 h-64 object-contain mx-auto'
      />
      <p className='text-xl text-white'>
        Sorry, an unexpected error has occurred!
      </p>
      <p className='text-xl text-white'>{error.statusText || error.message}</p>
      <Link to='/' className='bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600'>
        Home
      </Link>
    </div>
  );
};
