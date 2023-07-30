import { range } from 'lodash';

export const Pagination = (props) => {
  const { itemCount, pageSize, currentPage, onPageChange } = props;

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;

  const pages = range(1, pageCount + 1);

  return (
    <nav className='mx-auto'>
      <ul className='isolate inline-flex -space-x-px rounded-md shadow-sm'>
        {pages.map((page) => {
          const activeClass = page === currentPage ? 'bg-gray-600' : '';
          return (
            <li className={`${activeClass}`} key={`page_${page}`}>
              <button
                className='relative z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
