// 로고/카테고리/네비(ui상태)
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCategories } from '@/hooks/useCategories'
import { useUIStore } from '@/store/uiStore'
import Button from '@/components/ui/Button/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import { 
  Plus, 
  Folder, 
  ChevronLeft,
} from 'lucide-react'
import styles from './Sidebar.module.scss'

export default function Sidebar() {
  const pathname = usePathname()
  const { data: categories, isLoading } = useCategories()
  const { closeSidebar, openCategoryForm } = useUIStore()

  const isActive = (path: string) => pathname === path

  const handleAddCategory = () => {
    openCategoryForm() // Zustand 액션 호출
  }
  
  const handleCloseSidebar = () => {
    closeSidebar()
  }

  // const handleCategoryClick = () => {
  //   // 모바일에서는 카테고리 클릭 시 사이드바 닫기
  //   if (window.innerWidth <= 768) {
  //     closeSidebar()
  //   }
  // }

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.header}>
          <h2 className={`${styles.title} flex items-center gap-5`}>
            <Folder size={23} />
            Categories
          </h2>
          <button
            onClick={handleCloseSidebar}
            className={styles.closeButton}
            aria-label="사이드바 닫기"
          >
            <ChevronLeft size={23} />
          </button>
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