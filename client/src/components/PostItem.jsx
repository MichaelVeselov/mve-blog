import { Link } from 'react-router-dom';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';

import { creationDate } from '../utils/formatDate';

export const PostItem = ({ post, currentPage = '1', path = -1 }) => {
  return (
    <Link to={`/posts/${post._id}`} state={{ currentPage, path }}>
      <div className='flex flex-col basis-1/4 flex-grow'>
        <div
          className={post.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'}
        >
          {post.imgUrl && (
            <img
              src={`http://localhost:4000/${post.imgUrl}`}
              alt={post.title}
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
        <p className='text-white opacity-60 text-xs pt-4 line-clamp-4'>
          {post.text}
        </p>

        <div className='flex gap-3 items-center mt-2'>
          <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
            <AiFillEye /> <span>{post.views}</span>
          </button>
          <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
            <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
          </button>
        </div>
      </div>
    </Link>
  );
};
