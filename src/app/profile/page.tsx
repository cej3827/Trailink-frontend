'use client';

import UserProfile from '../../components/UserProfile'; //사용자 프로필 컴포넌트
import { useUserStore } from '@/src/store/useUserStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { isLoggedIn, userId } = useUserStore();
  const router = useRouter();

  // 로그인하지 않았을 경우 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  //컴포넌트 렌더링
  return (
    <div className="profile-page">
      {/* userId가 존재하는 경우에만 UserProfile 컴포넌트 렌더링*/}
      {userId && <UserProfile id={userId} />}
      {/* <CategoryFolders userId={currentUser.id} />  */}
    </div>
  );
}
