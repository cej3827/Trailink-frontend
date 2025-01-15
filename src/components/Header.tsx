'use client'

import Link from 'next/link';
import { useUserStore } from '../store/useUserStore';
import { useRouter } from 'next/navigation'; // useRouter import 추가

const Header = () => {
  // useUserStore hook을 사용하여 로그인 상태와 로그아웃 기능을 가져옴
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const logout = useUserStore((state) => state.logout);

  const router = useRouter(); // useRouter 훅 사용

  //로고 클릭 시 홈 화면으로 이동하는 핸들러
  const handleLogoClick = () => {
    router.push('/'); //홈으로 리다이렉션
  };
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo" onClick={handleLogoClick}>
          Trailink
        </div>

        <nav>
          {/* 사용자가 로그인한 상태일 경우, Profile 링크와 Logout 버튼 표시 */}
          {isLoggedIn ? (
            <>
              <Link href="/profile">Profile</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            // 로그인하지 않은 경우에는 아무 것도 표시하지 않음
            <></>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
