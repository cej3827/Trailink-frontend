// 검색/프로필/퀵액션

'use client'

import { useCurrentUser, useLogout } from '@/hooks/useAuth'
import { useUIStore } from '@/store/uiStore'
import { useBookmarkUIStore } from '@/store/bookmarkStore'
import SearchBar from '@/components2/ui/SearchBar/SearchBar'
import Button from '@/components2/ui/Button/Button'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import styles from './Header.module.scss'

export default function Header() {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { data: user } = useCurrentUser()
  const { logout, isLoading } = useLogout()
  const { openBookmarkForm, toggleSidebar } = useUIStore()

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
  }

  const handleSearch = (query: string) => {
    // 나중에 검색 기능 구현할 때 사용
    console.log('검색:', query)
  }

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className={styles.sidebarToggle}
          aria-label="사이드바 토글"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
        
        <h1 className={styles.logo}>북마크 매니저</h1>
      </div>

      <div className={styles.centerSection}>
        <SearchBar
          placeholder="북마크 검색..."
          onSearch={handleSearch}
          size="md"
        />
      </div>

      <div className={styles.rightSection}>
        <Button
          variant="primary"
          size="sm"
          onClick={openBookmarkForm}
          className={styles.addButton}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          추가
        </Button>

        {/* 사용자 프로필 드롭다운 */}
        <div className={styles.userMenu}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className={styles.userButton}
          >
            <div className={styles.userAvatar}>
              {user?.name.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className={styles.userName}>{user?.name || '사용자'}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>

          {userMenuOpen && (
            <div className={styles.userDropdown}>
              <div className={styles.userInfo}>
                <div className={styles.userEmail}>{user?.email}</div>
              </div>
              <hr className={styles.divider} />
              <button className={styles.menuItem}>
                설정
              </button>
              <button 
                className={cn(styles.menuItem, styles.logout)}
                onClick={handleLogout}
                disabled={isLoading}
              >
                {isLoading ? '로그아웃 중...' : '로그아웃'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
