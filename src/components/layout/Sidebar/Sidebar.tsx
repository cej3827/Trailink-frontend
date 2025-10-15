// 로고/카테고리/네비(ui상태)
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCategories } from '@/hooks/useCategories'
import { useCurrentUser, useLogout } from '@/hooks/useAuth'
import { useUIStore } from '@/store/uiStore'
import Button from '@/components/ui/Button/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import { 
  Plus, 
  Folder, 
  ChevronLeft,
  X,
  Settings,
  LogOut
} from 'lucide-react'
import styles from './Sidebar.module.scss'


interface SidebarProps {
  isMobile: boolean
}


export default function Sidebar({ isMobile }: SidebarProps) {
  const pathname = usePathname()
  const { data: categories, isLoading } = useCategories()
  const { data: user } = useCurrentUser()
  const logout = useLogout()
  const { closeSidebar, openCategoryForm } = useUIStore()

  const isActive = (path: string) => pathname === path

  const handleAddCategory = () => {
    openCategoryForm() // Zustand 액션 호출
  }
  
  const handleCloseSidebar = () => {
    closeSidebar()
  }

  const handleLogout = () => {
    logout.mutate()
    closeSidebar()
  }

  // const handleCategoryClick = () => {
  //   // 모바일에서는 카테고리 클릭 시 사이드바 닫기
  //   if (isMobile) {
  //     closeSidebar()
  //   }
  // }

  return (
    <>
      <aside className={`${styles.sidebar} ${isMobile ? styles.mobile : styles.desktop}`}>
        {/* 모바일에서만 프로필 섹션 표시 */}
        {isMobile && (
          <div className={styles.mobileProfile}>
            <div className={styles.profileHeader}>
              <div className={styles.avatar}>
                {user?.user_name.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className={styles.userInfo}>
                <div className={styles.userName}>{user?.user_name}</div>
                <div className={styles.userId}>{user?.user_id}</div>
              </div>
              <button
                onClick={handleCloseSidebar}
                className={styles.closeButtonMobile}
                aria-label="사이드바 닫기"
              >
                <X size={23} />
              </button>
            </div>
            <div className={styles.profileActions}>
              <button className={styles.actionButton}>
                <Settings size={18} />
                <span>설정</span>
              </button>
              <button 
                className={`${styles.actionButton} ${styles.logout}`}
                onClick={handleLogout}
                disabled={logout.isPending}
              >
                <LogOut size={18} />
                <span>{logout.isPending ? '로그아웃 중...' : '로그아웃'}</span>
              </button>
            </div>
          </div>
        )}
        
        <div className={styles.header}>
          <h2 className={`${styles.title} flex items-center gap-5`}>
            <Folder size={23} />
            Categories
          </h2>
          {!isMobile && (
            <button
              onClick={handleCloseSidebar}
              className={styles.closeButton}
              aria-label="사이드바 닫기"
            >
              <ChevronLeft size={23} />
            </button>
          )}
        </div>

        <nav className={styles.nav}>
          {/* 카테고리 섹션 */}
          <div className={styles.categorySection}>
            {/* 카테고리 목록 */}
            <div className={styles.categoryList}>
              {isLoading ? (
                <div className={styles.categoryLoading}>
                  <LoadingSpinner size="sm" />
                </div>
              ) : categories && categories.length > 0 ? (
                categories.map((category: { category_id: string; category_name: string; }) => (
                  <Link
                    key={category.category_id}
                    href={`/category/${category.category_id}`}
                    className={`${styles.categoryItem} ${
                      isActive(`/category/${category.category_id}`) ? styles.categoryItemActive : ''
                    }`}
                    // onClick={handleCategoryClick}
                  >
                    <span className="pr-10">◦</span>
                    <span className={styles.categoryName}>{category.category_name}</span>
                    {/* {category.bookmarkCount && (
                      <span className={styles.categoryCount}>
                        {category.bookmarkCount}
                      </span>
                    )} */}
                  </Link>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p className={styles.emptySubtext}>
                    첫 번째 카테고리를 만들어보세요
                  </p>
                </div>
              )}
            </div>

            {/* 새 카테고리 버튼 */}

            <Button
              variant="ghost"
              size="sm"
              onClick={handleAddCategory}
              className={styles.newCategoryButton}
              leftIcon={<Plus size={16} />}
            >
              새 카테고리
            </Button>
          </div>
        </nav>
      </aside>
    </>
  )
}