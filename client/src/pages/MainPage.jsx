import { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { paginate } from '../utils/paginate';

import {
  getAllPosts,
  selectAllPosts,
  selectPopularPosts,
  selectPostLoading,
} from '../redux/features/postSlice';

import { PostItem } from '../components/PostItem';
import { PopularPostItem } from '../components/PopularPostItem';
import { PostLoader } from '../components/PostLoader';
import { Pagination } from '../components/Pagination';

export const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const posts = useSelector(selectAllPosts);
  const popularPosts = useSelector(selectPopularPosts);
  const loading = useSelector(selectPostLoading);

  const dispatch = useDispatch();
  const location = useLocation();

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const pageSize = 3;
  const postCount = posts.length;
  const pageNumber = Math.ceil(postCount / pageSize);
  if (currentPage > pageNumber && currentPage > 1) {
    setCurrentPage((currentPage) => currentPage - 1);
  }
  const postCrop = paginate(posts, currentPage, pageSize);

  useEffect(() => {
    dispatch(getAllPosts());
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(location.state?.currentPage || 1);
  }, [location.state?.currentPage]);

  if (loading) {
    return (
      <div className='flex justify-center'>
        <PostLoader />
      </div>
    );
  }

  return !posts.length ? (
    <div className='text-xl text-center text-white py-10'>
      Posts not found....
    </div>
  ) : (
    <div className='max-w-[750px] mx-auto py-10'>
      <div className='flex justify-between gap-8'>
        <div className='flex flex-col gap-10 basis-4/5'>
          {postCrop?.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              currentPage={currentPage}
              path={location.pathname}
            />
          ))}
          <Pagination
            itemCount={postCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
        <div className='basis-1/5'>
          <div className='text-xs uppercase text-white'>Most viewed posts:</div>
          {popularPosts?.map((post) => (
            <PopularPostItem
              key={post._id}
              post={post}
              currentPage={currentPage}
              path={location.pathname}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
