// 로고/카테고리/네비(ui상태)
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCategories } from '@/hooks/useCategories'
import { useUIStore } from '@/store/uiStore'
import Button from '@/components2/ui/Button/Button'
import LoadingSpinner from '@/components2/ui/LoadingSpinner/LoadingSpinner'
import { 
  Home, 
  Plus, 
  Folder, 
  FolderOpen, 
  Settings,
  ChevronLeft,
  Menu
} from 'lucide-react'
import { cn } from '@/lib/utils'
import styles from './Sidebar.module.scss'

export default function Sidebar() {
  const pathname = usePathname()
  const { data: categories, isLoading } = useCategories()
  const { sidebarOpen, closeSidebar, openCategoryForm } = useUIStore()

  const isActive = (path: string) => pathname === path

  const handleCategoryClick = () => {
    // 모바일에서는 카테고리 클릭 시 사이드바 닫기
    if (window.innerWidth <= 768) {
      closeSidebar()
    }
  }

  return (
    <>
      <aside className={cn(
        styles.sidebar,
        sidebarOpen && styles.sidebarOpen
      )}>
        {/* 사이드바 헤더 */}
        <div className={styles.sidebarHeader}>
          <h2 className={styles.title}>CATEGORIES</h2>
          <button
            onClick={closeSidebar}
            className={styles.closeButton}
            aria-label="사이드바 닫기"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className={styles.nav}>
          {/* 홈 메뉴 */}
          <Link 
            href="/dashboard" 
            className={cn(
              styles.navItem,
              isActive('/dashboard') && styles.navItemActive
            )}
            onClick={handleCategoryClick}
          >
            <Home size={18} />
            <span>홈</span>
          </Link>

          {/* 카테고리 섹션 */}
          <div className={styles.categorySection}>
            <div className={styles.sectionHeader}>
              <Folder size={16} />
              <span>카테고리</span>
            </div>

            {/* 카테고리 목록 */}
            <div className={styles.categoryList}>
              {isLoading ? (
                <div className={styles.categoryLoading}>
                  <LoadingSpinner size="sm" />
                  <span>카테고리 로딩 중...</span>
                </div>
              ) : categories && categories.length > 0 ? (
                categories.map((category: { id: number; name: string; }) => (
                  <Link
                    key={category.id}
                    href={`/dashboard/category/${category.id}`}
                    className={cn(
                      styles.categoryItem,
                      isActive(`/dashboard/category/${category.id}`) && styles.categoryItemActive
                    )}
                    onClick={handleCategoryClick}
                  >
                    <div className={styles.categoryIcon}>
                      {isActive(`/dashboard/category/${category.id}`) ? (
                        <FolderOpen size={16} />
                      ) : (
                        <Folder size={16} />
                      )}
                    </div>
                    <span className={styles.categoryName}>{category.name}</span>
                    {/* {category.bookmarkCount && (
                      <span className={styles.categoryCount}>
                        {category.bookmarkCount}
                      </span>
                    )} */}
                  </Link>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <Folder size={24} className={styles.emptyIcon} />
                  <p>카테고리가 없습니다</p>
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
              onClick={openCategoryForm}
              className={styles.newCategoryButton}
              leftIcon={<Plus size={16} />}
            >
              새 카테고리
            </Button>
          </div>

          {/* 설정 메뉴 (하단) */}
          <div className={styles.bottomMenu}>
            <Link 
              href="/dashboard/settings" 
              className={cn(
                styles.navItem,
                isActive('/dashboard/settings') && styles.navItemActive
              )}
              onClick={handleCategoryClick}
            >
              <Settings size={18} />
              <span>설정</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  )
}