import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { registerUser, selectIsAuth } from '../redux/features/authSlice';

import { regExpEmail } from '../utils/checkEmail';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    getFieldState,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const isAuth = useSelector(selectIsAuth);

  const clearForm = () => {
    reset();
    setFocus('firstName');
  };

  const onSubmit = async (data) => {
    try {
      const { payload } = await dispatch(registerUser(data));
      clearForm();
      toast(payload.message);
    } catch (error) {
      console.log(error);
      clearForm();
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [isAuth]);

  useEffect(() => {
    setFocus('firstName');
    // eslint-disable-next-line
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-1/4 h-60 mx-auto mt-40'
      noValidate
    >
      <h2 className='text-lg text-white text-center'>Registration</h2>

      <div className='mb-6'>
        <label htmlFor='firstName' className='text-xs text-gray-400'>
          First name:
        </label>
        <input
          id='firstName'
          type='text'
          autoComplete='off'
          placeholder='First name'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
          {...register('firstName', {
            required: {
              value: true,
              message: 'First name is required...',
            },
            minLength: {
              value: 2,
              message: 'First name must be at least 2 characters long...',
            },
          })}
        />
        {errors?.firstName && (
          <p className='mt-2 text-red-500 text-xs italic'>
            {errors.firstName.message}
          </p>
        )}
        {!errors?.firstName && !getFieldState('firstName').isDirty && (
          <p className='mt-2 text-gray-400 text-xs italic'>
            First name is required and must be at least 2 characters long...
          </p>
        )}
      </div>

      <div className='mb-6'>
        <label htmlFor='lastName' className='text-xs text-gray-400'>
          Last name:
        </label>
        <input
          id='lastName'
          type='text'
          autoComplete='off'
          placeholder='Last name'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
          {...register('lastName', {
            required: {
              value: true,
              message: 'Last name is required...',
            },
            minLength: {
              value: 2,
              message: 'Last name must be at least 2 characters long...',
            },
          })}
        />
        {errors?.lastName && (
          <p className='mt-2 text-red-500 text-xs italic'>
            {errors.lastName.message}
          </p>
        )}
        {!errors?.lastName && !getFieldState('lastName').isDirty && (
          <p className='mt-2 text-gray-400 text-xs italic'>
            Last name is required and must be at least 2 characters long...
          </p>
        )}
      </div>

      <div className='mb-6'>
        <label htmlFor='email' className='text-xs text-gray-400'>
          Email:
        </label>
        <input
          id='email'
          type='email'
          autoComplete='off'
          placeholder='example@example.com'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required...',
            },
            pattern: {
              value: regExpEmail,
              message: 'Invalid email format...',
            },
          })}
        />
        {errors?.email && (
          <p className='mt-2 text-red-500 text-xs italic'>
            {errors.email.message}
          </p>
        )}
        {!errors?.email && !getFieldState('email').isDirty && (
          <p className='mt-2 text-gray-400 text-xs italic'>
            Email is required and must be valid...
          </p>
        )}
      </div>

      <div className='mb-6'>
        <label htmlFor='password' className='text-xs text-gray-400'>
          Password:
        </label>
        <input
          id='password'
          type='password'
          autoComplete='off'
          placeholder='**********'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required...',
            },
            minLength: {
              value: 5,
              message: 'Password must be at least 5 characters long...',
            },
          })}
        />
        {errors?.password && (
          <p className='mt-2 text-red-500 text-xs italic'>
            {errors.password.message}
          </p>
        )}
        {!errors?.password && !getFieldState('password').isDirty && (
          <p className='mt-2 text-gray-400 text-xs italic'>
            Password is required and must be at least 5 characters long...
          </p>
        )}
      </div>

      <div className='flex gap-8 justify-center mt-4'>
        <button
          type='submit'
          className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'
          disabled={!isValid || !isDirty}
        >
          Confirm
        </button>
        <Link
          to='/login'
          className='flex justify-center items-center text-xs text-white'
        >
          Already registered?
        </Link>
      </div>
    </form>
  );
};
