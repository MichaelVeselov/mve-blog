import { AiFillDelete } from 'react-icons/ai';

export const CommentItem = ({ comment, userId, onDelete }) => {
  const firstLetter = comment.author.firstName.toUpperCase()[0];
  const secondLetter = comment.author.lastName.toUpperCase()[0];
  const avatar = comment.author.avatarUrl;

  return (
    <div className='flex items-center gap-3'>
      <div className='flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm'>
        <img
          src={avatar}
          className='w-7 rounded-full'
          alt={firstLetter + secondLetter}
        />
      </div>
      <div className='flex text-gray-300 text-[10px]'>{comment.text}</div>
      {userId === comment.author._id && (
        <button
          onClick={onDelete}
          className='flex items-center justify-center gap-2  text-white opacity-50'
        >
          <AiFillDelete />
        </button>
      )}
    </div>
  );
};
