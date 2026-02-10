// 로그인 유저용 레이아웃 (클라이언트)
'use client'

import { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import { useUIStore } from '@/store/uiStore'
import styles from './AuthenticatedLayout.module.scss'
import CategoryForm from '@/components/category/CategoryForm/CategoryForm'
import BookmarkForm from '@/components/bookmark/BookmarkForm/BookmarkForm'


interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const { sidebarOpen, closeSidebar } = useUIStore()
  const [isMobile, setIsMobile] = useState(false)

  // 화면 크기 감지 및 모바일에서 초기 상태 설정
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      
      // 모바일로 전환될 때 사이드바 닫기
      if (mobile) {
        closeSidebar()
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [closeSidebar])



  // 모바일에서 body 스크롤 방지
  useEffect(() => {
  if (isMobile && sidebarOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'unset'
  }

  return () => {
    document.body.style.overflow = 'unset'
  }
}, [isMobile, sidebarOpen])
  

  return (
    <div className={`${styles.layout} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed} flex h-[100dvh] flex-col overflow-hidden`}>
      {/* 헤더 */}
      <Header />
      
      {/* 메인 컨테이너 */}
      <div className={`${styles.main} flex min-h-0 flex-1 overflow-hidden`}>
        {/* 사이드바 */}
        {sidebarOpen && <Sidebar isMobile={isMobile} />}
        
        <main className={`${styles.content} relative min-h-0 flex-1 overflow-y-auto`}>
          <div className={`${styles.container} mx-auto`}>
            {children}
          </div>
        </main>
      </div>

      {/* 전역 모달들 */}
      <BookmarkForm />
      <CategoryForm />
    </div>
  )
}
