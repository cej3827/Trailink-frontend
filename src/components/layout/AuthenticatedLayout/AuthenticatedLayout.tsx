// 로그인 유저용 레이아웃 (클라이언트)
'use client'

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
  const { sidebarOpen } = useUIStore()

  return (
    <div className={`${styles.layout} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
      {/* 헤더 */}
      <Header />
      
      {/* 메인 컨테이너 */}
      <div className={styles.main}>
        {/* 사이드바 */}
        {sidebarOpen && <Sidebar />}
        
        <main className={styles.content}>
          <div className={styles.container}>
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
