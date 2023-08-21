import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { orderBy } from 'lodash';

import axios from '../utils/axios';
import { creationDate } from '../utils/formatDate';

import { selectCurrentUser } from '../redux/features/authSlice';
import { deletePost, selectPostLoading } from '../redux/features/postSlice';

import { SinglePostLoader } from '../components/SinglePostLoader';
import { CommentLoader } from '../components/CommentLoader';

import {
  createComment,
  getCommentsByPostId,
  deleteComment,
  selectComments,
  selectCommentLoading,
} from '../redux/features/commentSlice';

import { CommentItem } from '../components/CommentItem';

export const SinglePostPage = () => {
  const [post, setPost] = useState(null);

  const {
    register,
    handleSubmit,
    resetField,
    setFocus,
    formState: { isValid, isDirty },
  } = useForm({
    defaultValues: {
      comment: '',
    },
    mode: 'onChange',
  });

  const { currentPage, path } = useLocation().state;

  const user = useSelector(selectCurrentUser);
  const postLoading = useSelector(selectPostLoading);
  const commentLoading = useSelector(selectCommentLoading);

  const comments = orderBy(
    useSelector(selectComments),
    ['createdAt'],
    ['desc']
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { postId } = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${postId}`);
    setPost(data.post);
  }, [postId]);

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getCommentsByPostId(postId));
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      setPost(null);
      const { payload } = await dispatch(deletePost(postId));
      toast(payload.message);
      navigate('/posts');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const { payload } = await dispatch(deleteComment({ commentId, postId }));
      toast(payload.message);
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    resetField('comment');
    setFocus('comment');
  };

  const onSubmit = async (values) => {
    try {
      const commentData = { postId, comment: values.comment };
      const { payload } = await dispatch(createComment(commentData));
      toast(payload.message);
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
    setFocus('comment');
    // eslint-disable-next-line
  }, []);

  if (postLoading) {
    return (
      <div className='flex justify-center'>
        <SinglePostLoader />
      </div>
    );
  }

  return (
    post && (
      <div className='w-2/3 mx-auto'>
        <button
          className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
          onClick={() => navigate(path, { state: { currentPage } })}
        >
          Back
        </button>
        <div className='flex gap-10 py-8'>
          <div className='w-3/5'>
            <div className='flex flex-col basis-1/4 flex-grow'>
              <div
                className={
                  post.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'
                }
              >
                {post.imgUrl && (
                  <img
                    src={`http://localhost:4000/${post.imgUrl}`}
                    alt='img'
                    className='object-cover w-full'
                  />
                )}
              </div>
              <div className='flex justify-between items-center pt-2'>
                <div className='flex gap-1'>
                  <div className='text-xs text-white opacity-50'>
                    {post.author.firstName}
                  </div>
                  <div className='text-xs text-white opacity-50'>
                    {post.author.lastName}
                  </div>
                </div>
                <div className='text-xs text-white opacity-50'>
                  {creationDate.format(new Date(post.createdAt))}
                </div>
              </div>
              <div className='text-white text-xl'>{post.title}</div>
              <p className='text-white opacity-60 text-xs pt-4'>{post.text}</p>

              <div className='flex gap-3 items-center mt-2 justify-between'>
                <div className='flex gap-3 mt-4'>
                  <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                    <AiFillEye /> <span>{post.views}</span>
                  </button>
                  <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                    <AiOutlineMessage />
                    <span>{comments?.length || 0} </span>
                  </button>
                </div>
                {user?._id === post.author._id && (
                  <div className='flex gap-3 mt-4'>
                    <button className='flex items-center justify-center gap-2 text-white opacity-50'>
                      <Link to={`/posts/${postId}/edit`}>
                        <AiTwotoneEdit />
                      </Link>
                    </button>
                    <button
                      onClick={handleDeletePost}
                      className='flex items-center justify-center gap-2  text-white opacity-50'
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='w-2/5 px-2 py-8 bg-gray-700 flex flex-col gap-2 rounded-sm'>
            {user && (
              <form
                className='flex gap-2 mb-6'
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type='text'
                  autoComplete='off'
                  placeholder='Your comment...'
                  className='text-black w-full rounded-lg bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700'
                  {...register('comment', {
                    required: {
                      value: true,
                      message: 'Comment is required...',
                    },
                    minLength: {
                      value: 2,
                      message: 'Comment must be at least 2 characters long...',
                    },
                  })}
                />

                <button
                  type='submit'
                  className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-lg py-2 px-4'
                  disabled={!isValid || !isDirty}
                >
                  Send
                </button>
              </form>
            )}

            {commentLoading ? (
              <CommentLoader />
            ) : (
              comments?.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  userId={user?._id}
                  onDelete={() => handleDeleteComment(comment._id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    )
  );
};
