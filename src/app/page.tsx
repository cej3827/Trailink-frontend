'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/src/store/useUserStore';
import HomeContent from '../components/HomeContent'

// 컴포넌트를 기본 내보내기
export default function Page() {
  const { isLoggedIn } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    // 사용자가 로그인하지 않은 경우
    if (!isLoggedIn) {
      router.replace('/login'); // 로그인 페이지로 리다이렉트
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <div>Redirecting to login...</div>; // 리다이렉트 중일 때 표시
  }

  return <HomeContent />; // 로그인된 경우 홈 화면의 실제 콘텐츠를 렌더링
}
