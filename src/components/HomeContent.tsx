'use client';

import BookmarkForm from './BookmarkForm'; //북마크 추가 폼 
// import CategoryForm from './CategoryForm'; //카테고리 추가 폼
import FollowingActivityList from './FollowingActivityList'; //팔로잉 활동 리스트
import { useUserStore } from '../store/useUserStore';//상태 관리 훅

export default function HomeContent() {
  // Zustand에서 사용자 이름과 로그인 상태를 가져옴
  const { userName, isLoggedIn } = useUserStore();

  return (
    <div className="home-page">
       {/* 사용자가 로그인한 경우 */}
      {isLoggedIn ? (
        <>
          <h1>Welcome, {userName}</h1>
          <BookmarkForm />
          {/* <CategoryForm /> */}
          <h2>Following Activity</h2>
          <FollowingActivityList />
        </>
      ) : (
        // 로그인하지 않은 경우, 로그인 메시지 표시
        <p>Please log in to see the content.</p>
      )}
    </div>
  );
}
