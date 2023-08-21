import { Link } from 'react-router-dom';

export const PopularPostItem = ({ post, currentPage = '1', path = -1 }) => {
  return (
    <div className='bg-gray-600 my-1'>
      <Link
        to={`/posts/${post._id}`}
        state={{ currentPage, path }}
        className='flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white'
      >
        {post.title}
      </Link>
    </div>
  );
};
