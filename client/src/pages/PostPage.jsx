import { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import axios from '../utils/axios';
import { paginate } from '../utils/paginate';

import { selectAllPosts } from '../redux/features/postSlice';

import { PostItem } from '../components/PostItem';
import { PostLoader } from '../components/PostLoader';
import { Pagination } from '../components/Pagination';

export const PostPage = () => {
  const [ownPosts, setOwnPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const allPosts = useSelector(selectAllPosts);

  const fetchOwnPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/posts/user/own-posts');
      setOwnPosts(data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const pageSize = 3;
  const ownPostCount = ownPosts.length;
  const pageNumber = Math.ceil(ownPostCount / pageSize);
  if (currentPage > pageNumber && currentPage > 1) {
    setCurrentPage((currentPage) => currentPage - 1);
  }
  const ownPostCrop = paginate(ownPosts, currentPage, pageSize);

  useEffect(() => {
    fetchOwnPosts();
  }, [allPosts]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  if (loading) {
    return (
      <div className='flex justify-center'>
        <PostLoader />
      </div>
    );
  }

  return !ownPosts.length ? (
    <div className='text-xl text-center text-white py-10'>
      Own posts not found....
    </div>
  ) : (
    <div className='w-2/5 mx-auto py-10 flex flex-col gap-10'>
      {ownPostCrop.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
      <Pagination
        itemCount={ownPostCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
