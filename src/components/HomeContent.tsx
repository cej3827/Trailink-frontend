import { useState } from 'react';
import BookmarkForm from './BookmarkForm'; //북마크 추가 폼 
import CategoryForm from './CategoryForm'; //카테고리 추가 폼
import FollowingActivityList from './FollowingActivityList'; //팔로잉 활동 리스트
import { useUserStore } from '../store/useUserStore';//상태 관리 훅

export default function HomeContent() {
  const { currentUser, isLoggedIn } = useUserStore(); // Zustand에서 현재 사용자와 로그인 상태를 가져옴
  const [activeTab, setActiveTab] = useState<'bookmark' | 'category'>('bookmark'); // 현재 활성화된 탭 상태

  return (
    <div className="home-page">
      {/* 사용자가 로그인한 경우 */}
      {isLoggedIn ? (
        <>
          <h1>Welcome, {currentUser?.userName}</h1>
          {/* 탭 버튼 */}
          <div className="tab-bar">
            <button 
              className={activeTab === 'bookmark' ? 'active' : ''} 
              onClick={() => setActiveTab('bookmark')}
            >
              북마크 추가
            </button>
            <button 
              className={activeTab === 'category' ? 'active' : ''} 
              onClick={() => setActiveTab('category')}
            >
              카테고리 추가
            </button>
          </div>

          {/* 선택된 탭에 따라 다른 폼 표시 */}
          <div className="tab-content">
            {activeTab === 'bookmark' ? <BookmarkForm /> : <CategoryForm />}
          </div>

          <h2>Following Activity</h2>
          <FollowingActivityList />
        </>
      ) : (
        <p>Please log in to see the content.</p>
      )}
    </div>
  );
}
