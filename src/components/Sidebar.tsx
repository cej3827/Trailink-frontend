'use client'

import Link from 'next/link';
import { useUserStore } from '../store/useUserStore';
import { useCategoryStore } from '../store/useCategoryStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; 

const Sidebar = () => {
  const { currentUser, isLoggedIn } = useUserStore(); // 사용자 정보를 Zustand 스토어에서 가져옴
  const { categories, fetchCategories} = useCategoryStore();  
  const defaultProfileImage = '/default_profile.jpg'; // 기본 프로필 이미지 경로
  const router = useRouter(); // 라우터 훅을 사용하여 페이지 이동 처리

  // 사용자가 로그인한 경우 카테고리 데이터를 가져옴
  useEffect(() => {
    if (isLoggedIn && currentUser?.userId) {
      fetchCategories(currentUser.userId);
    }
  }, [isLoggedIn, currentUser, fetchCategories, categories]);

  // 카테고리 클릭 시 해당 카테고리 페이지로 이동
  const handleCategoryClick = (categoryId: number ) => {
    try {
      router.push(`/category/${categoryId}`); // 카테고리 페이지로 이동
    } catch (error) {
      console.error('Error handling category click:', error);
    }
  };

  // 프로필 클릭 시 프로필 페이지로 이동
  const handleProfileClick = () => {
    router.push(`/profile`);
  };

  // 로그인하지 않은 경우 아무것도 렌더링하지 않음
  if (!isLoggedIn) return null;

  return (
    <aside className="sidebar">
      <div className="user-info" onClick={() => handleProfileClick()}>
      <Image 
        src={currentUser?.profileImg || defaultProfileImage} 
        alt={currentUser?.userName || 'User'} 
        width={40}
        height={40}
      />
        <h2>{currentUser?.userName}</h2>
      </div>
      <nav>
        <h3>Categories</h3>
        <ul>
          {categories.map((category) => (
            <li key={category.category_id}>
              <a onClick={() => handleCategoryClick(category.category_id)}>
                {category.category_name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <Link href="/search">Find Users</Link>
    </aside>
  );
};

export default Sidebar;
