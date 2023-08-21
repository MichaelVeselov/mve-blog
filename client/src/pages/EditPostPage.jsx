import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { updatePost } from '../redux/features/postSlice';

import axios from '../utils/axios';

export const EditPostPage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { postId } = useParams();

  const {
    register,
    handleSubmit,
    setFocus,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: async () => {
      const { data } = await axios.get(`/posts/${postId}`);
      data.post.imgUrl &&
        setImageUrl(`http://localhost:4000/${data.post.imgUrl}`);
      return {
        title: data.post.title,
        text: data.post.text,
        image: data.post.imgUrl,
      };
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    let image = '';
    if (typeof values.image === 'string') {
      image = values.image;
    }
    if (typeof values.image === 'object') {
      image = values.image[0];
    }

    try {
      const data = new FormData();
      data.append('title', values.title);
      data.append('text', values.text);
      data.append('image', image);
      const updateData = { postData: data, postId };
      const { payload } = await dispatch(updatePost(updateData));
      toast(payload.message);
      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  };

  const removeImage = (event) => {
    event.preventDefault();
    setValue('image', '');
    setImageUrl('');
  };

  useEffect(() => {
    setFocus('title');
    // eslint-disable-next-line
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-1/3 mx-auto py-10'
      noValidate
    >
      <div className='mb-6'>
        <label
          htmlFor='file'
          className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'
        >
          Add your image:
        </label>
        <input
          id='file'
          type='file'
          className='hidden'
          {...register('image', {
            onChange: (event) =>
              setImageUrl(URL.createObjectURL(getValues('image')[0])),
          })}
        />
        <div className='flex object-cover py-2'>
          {imageUrl && <img src={imageUrl} alt={getValues('title')} />}
        </div>
      </div>
      <div className='mb-6'>
        <label htmlFor='title' className='text-xs text-white opacity-70'>
          Post title:
        </label>
        <input
          id='title'
          type='text'
          autoComplete='off'
          placeholder='Title...'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
          {...register('title', {
            required: {
              value: true,
              message: 'Post title is required...',
            },
            minLength: {
              value: 3,
              message: 'Post title must be at least 3 characters long...',
            },
          })}
        />
        {errors?.title && (
          <p className='mt-2 text-red-500 text-xs italic'>
            {errors.title.message}
          </p>
        )}
      </div>

      <div className='mb-6'>
        <label htmlFor='content' className='text-xs text-white opacity-70'>
          Post text:
        </label>
        <textarea
          id='content'
          type='text'
          autoComplete='off'
          placeholder='Text...'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700'
          {...register('text', {
            required: {
              value: true,
              message: 'Post text is required...',
            },
            minLength: {
              value: 3,
              message: 'Post text must be at least 3 characters long...',
            },
          })}
        />
        {errors?.text && (
          <p className='mt-2 text-red-500 text-xs italic'>
            {errors.text.message}
          </p>
        )}
      </div>

      <div className='flex gap-8 items-center justify-center mt-4'>
        <button
          type='submit'
          className='flex justify-center items-center bg-green-600 text-xs text-white rounded-sm py-2 px-4'
          disabled={!isValid}
        >
          Save changes
        </button>
        <button
          className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'
          onClick={removeImage}
        >
          Remove image
        </button>
        <button
          className='flex justify-center items-center bg-gray-500 text-xs text-white rounded-sm py-2 px-4'
          onClick={(event) => {
            event.preventDefault();
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
    </form>
  );
};
