'use client';

import Head from 'next/head';
import LoadingSpinner from "@/src/components/common/LoadingSpinner";
import LoginForm from "@/src/components/LoginForm"; //로그인폼 컴포넌트
import { useUserStore } from "@/src/store/useUserStore"; //전역 상태 관리를 위한 사용자 스토어
import { useRouter } from 'next/navigation'; //페이지 이동을 처리하기 위한 훅
import { useEffect, useState } from 'react'; //react 훅

export default function LoginPage() {
  const { isLoggedIn } = useUserStore();  // 전역 상태에서 사용자 로그인 여부를 확인
  const router = useRouter(); 
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리하는 상태값 정의

  // 컴포넌트가 마운트될 때 실행되는 훅
  useEffect(() => {
    setLoading(false);
    // 사용자가 이미 로그인한 상태라면 홈 화면으로 리다이렉트
    if (isLoggedIn) {
      router.replace('/'); // 현재 경로를 대체하여 홈 화면으로 이동
    }
  }, [isLoggedIn, router]);

  if (loading) return <LoadingSpinner />;

  // 로그인 폼 컴포넌트를 렌더링
  return (
    <>
    <Head>
      <title>Login - Trailink</title>
    </Head>
    <div>
      <LoginForm />
    </div>
    </>
  );
}
