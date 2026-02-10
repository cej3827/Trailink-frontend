// 로고/카테고리/네비(ui상태)
'use client'

import Link from 'next/link'
import { useEffect, useId, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useCategories, useCreateCategory } from '@/hooks/useCategories'
import { useCurrentUser, useLogout } from '@/hooks/useAuth'
import { useUIStore } from '@/store/uiStore'
import Button from '@/components/ui/Button/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import { ButtonSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner'
import { 
  Plus, 
  Minus,
  Folder,
  FolderOpen,
  ChevronLeft,
  X,
  Settings,
  LogOut,
  Hash
} from 'lucide-react'
import styles from './Sidebar.module.scss'
import { Category, CreateCategoryData } from '@/types'


interface SidebarProps {
  isMobile: boolean
}


export default function Sidebar({ isMobile }: SidebarProps) {
  const pathname = usePathname()
  const { data: categories, isLoading } = useCategories()
  const createCategory = useCreateCategory()
  const { data: user } = useCurrentUser()
  const logout = useLogout()
  const { closeSidebar, openCategoryModal } = useUIStore()
  const [inlineOpen, setInlineOpen] = useState(false)
  const [inlineData, setInlineData] = useState({
    category_name: '',
    category_description: '',
  })
  const nameInputRef = useRef<HTMLInputElement | null>(null)
  const nameInputId = useId()
  const descriptionId = useId()

  const isActive = (path: string) => pathname === path

  const handleAddCategory = () => {
    if (isMobile) {
      openCategoryModal('create')
      closeSidebar()
      return
    }
    setInlineOpen((prev) => !prev)
  }

  const handleInlineClose = () => {
    setInlineData({ category_name: '', category_description: '' })
    setInlineOpen(false)
  }

  const handleInlineChange = (field: 'category_name' | 'category_description', value: string) => {
    setInlineData((prev) => ({ ...prev, [field]: value }))
  }

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inlineData.category_name.trim()) return
    try {
      await createCategory.mutateAsync(inlineData as CreateCategoryData)
      handleInlineClose()
    } catch {
      // 에러 토스트는 훅에서 처리
    }
  }

  useEffect(() => {
    if (inlineOpen) {
      nameInputRef.current?.focus()
    }
  }, [inlineOpen])
  
  const handleCloseSidebar = () => {
    closeSidebar()
  }

  const handleLogout = () => {
    logout.mutate()
    closeSidebar()
  }

  return (
    <>
      <aside 
        className={`
          ${styles.sidebar} 
          ${isMobile ? styles.mobile : styles.desktop}
          ${isMobile ? 'fixed inset-0 h-screen w-screen z-50' : 'h-full'}
          overflow-y-auto shrink-0
        `}
      >
        {/* 모바일에서만 프로필 섹션 표시 */}
        {isMobile && (
          <div className={`${styles.mobileProfile} relative`}>
            <div className={`${styles.profileHeader} flex items-center`}>
              <div className={`${styles.avatar} flex items-center justify-center`}>
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
            <div className={`${styles.profileActions} flex flex-col`}>
              <button className={`${styles.actionButton} flex items-center w-full text-left`}>
                <Settings size={18} />
                <span>설정</span>
              </button>
              <button 
                className={`${styles.actionButton} ${styles.logout} flex items-center w-full text-left`}
                onClick={handleLogout}
                disabled={logout.isPending}
              >
                {logout.isPending ? (
                  <ButtonSpinner size="sm" />
                ) : (
                  <LogOut size={18} />
                )}
                <span>{logout.isPending ? '로그아웃 중...' : '로그아웃'}</span>
              </button>
            </div>
          </div>
        )}
        
        <div className={`${styles.header} flex items-center justify-between`}>
          <h2 className={`${styles.title} flex items-center`}>
            <Hash size={20} strokeWidth={2.5} />
            <span>Categories</span>
          </h2>
          {!isMobile && (
            <button
              onClick={handleCloseSidebar}
              className={styles.closeButton}
              aria-label="사이드바 닫기"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
          )}
        </div>

        <nav className={`${styles.nav} flex flex-col`}>
          {/* 카테고리 섹션 */}
          <div className={styles.categorySection}>
            {/* 카테고리 목록 */}
            <div className={styles.categoryList}>
              {isLoading ? (
                <div className={styles.categoryLoading}>
                  <LoadingSpinner size="sm" />
                </div>
              ) : categories.length > 0 ? (
                categories.map((category: Category) => {
                  const active = isActive(`/category/${category.category_id}`)
                  return (
                    <Link
                      key={category.category_id}
                      href={`/category/${category.category_id}`}
                      className={`${styles.categoryItem} flex items-center w-full ${
                        active ? styles.categoryItemActive : ''
                      }`}
                    >
                      {active ? (
                        <FolderOpen size={18} strokeWidth={2} className={`${styles.categoryIcon} shrink-0`} />
                      ) : (
                        <Folder size={18} strokeWidth={2} className={`${styles.categoryIcon} shrink-0`} />
                      )}
                      <span className={`${styles.categoryName} flex-1`}>{category.category_name}</span>
                    </Link>
                  )
                })
              ) : (
                <div className={`${styles.emptyState} flex flex-col items-center`}>
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
              className={`${styles.newCategoryButton} flex items-center justify-start w-full text-left`}
              leftIcon={
                inlineOpen
                  ? <Minus size={18} strokeWidth={2.5} />
                  : <Plus size={18} strokeWidth={2.5} />
              }
              aria-expanded={inlineOpen}
            >
              {inlineOpen ? '접기' : '새 카테고리'}
            </Button>

            {!isMobile && inlineOpen && (
              <form className={`${styles.inlineForm} flex flex-col`} onSubmit={handleInlineSubmit}>
                <div className={`${styles.inlineField} flex flex-col`}>
                  <label className={styles.inlineLabel} htmlFor={nameInputId}>
                    카테고리 이름
                  </label>
                  <input
                    ref={nameInputRef}
                    id={nameInputId}
                    type="text"
                    value={inlineData.category_name}
                    onChange={(e) => handleInlineChange('category_name', e.target.value)}
                    placeholder="예: 리서치, 읽을거리"
                    className={styles.inlineInput}
                    maxLength={50}
                    required
                  />
                </div>
                <div className={`${styles.inlineField} flex flex-col`}>
                  <label className={styles.inlineLabel} htmlFor={descriptionId}>
                    설명 (선택)
                  </label>
                  <textarea
                    id={descriptionId}
                    value={inlineData.category_description}
                    onChange={(e) => handleInlineChange('category_description', e.target.value)}
                    placeholder="짧은 설명을 남겨도 좋아요"
                    className={styles.inlineTextarea}
                    rows={2}
                  />
                </div>
                <div className={`${styles.inlineActions} flex justify-end`}>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleInlineClose}
                    disabled={createCategory.isPending}
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    isLoading={createCategory.isPending}
                  >
                    생성
                  </Button>
                </div>
              </form>
            )}
          </div>
        </nav>
      </aside>
    </>
  )
}
