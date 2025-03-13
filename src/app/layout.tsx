// "use client"

// import '../styles/globals.scss';
// import Sidebar from '../components/Sidebar'; //사이드바
// import Header from '../components/Header'; //헤더
// import LoginForm from '../components/LoginForm'; //로그인폼
// import LoadingSpinner from '../components/common/LoadingSpinner';

// import { useUserStore } from '../store/useUserStore';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function RootLayout({
//   children, //하위 컴포넌트
// }: {
//   children: React.ReactNode; //React 노드 타입을 가진 children prop
// }) {
//   //전역 상태에서 로그인 여부
//   const { isLoggedIn } = useUserStore();
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   //컴포넌트가 마운트된 후 로그인 상태를 확인
//   useEffect(() => {
//     setLoading(false);
//     try {
//       if (!isLoggedIn) {
//         router.replace('/login'); //로그인하지 않았으면 로그인 페이지로 리다이렉트
//       }
//     } catch (error) {
//       console.error('Error during navigation:', error);
//     }
//   }, [isLoggedIn, router]);

//   if (loading) return <LoadingSpinner/>; // 로딩 중일 때 렌더링 방지

//   // 로그인되지 않은 경우: 헤더와 로그인 폼만 렌더링
//   if (!isLoggedIn) {
//     return (
//       <html lang="en">
//         <body>
//           <Header />
//           <LoginForm />
//         </body>
//       </html>
//     );
//   }

//   // 로그인된 경우: 전체 레이아웃 렌더링
//   return (
//     <html lang="en">
//       <body>
//         <Header />
//         <div className="app-container">
//           <Sidebar />
//           <main>{children}</main>
//         </div>
//       </body>
//     </html>
//   );
// }

import '../styles/globals.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
