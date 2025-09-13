// 로그인 유저용 레이아웃 (클라이언트)
'use client'

import { useEffect } from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
// import BookmarkForm from '@/components/bookmark/BookmarkForm/BookmarkForm'
// import CategoryForm from '@/components/category/CategoryForm/CategoryForm'
import { useUIStore } from '@/store/uiStore'
import { cn } from '@/lib/utils'
import styles from './AuthenticatedLayout.module.scss'

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const { sidebarOpen, toggleSidebar } = useUIStore()

  // 모바일에서 사이드바 열렸을 때 바깥 영역 클릭하면 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && !sidebarOpen) {
        // 데스크톱에서는 기본적으로 사이드바 열기
        // useUIStore의 openSidebar()가 있다면 호출
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // 초기 실행

    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarOpen])

  return (
    <div className={styles.layout}>
      {/* 헤더 */}
      <Header />
      
      {/* 메인 컨테이너 */}
      <div className={styles.main}>
        {/* 사이드바 */}
        <Sidebar />
        
        {/* 모바일 오버레이 */}
        {sidebarOpen && (
          <div 
            className={styles.overlay}
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}
        
        {/* 메인 컨텐츠 */}
        <main className={cn(
          styles.content,
          !sidebarOpen && styles.contentExpanded
        )}>
          <div className={styles.container}>
            {children}
          </div>
        </main>
      </div>

      {/* 전역 모달들 */}
      {/* <BookmarkForm />
      <CategoryForm /> */}
    </div>
  )
}
