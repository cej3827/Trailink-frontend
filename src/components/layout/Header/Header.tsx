// 검색/프로필
'use client'

import { useCurrentUser, useLogout } from '@/hooks/useAuth'
import SearchBar from '@/components/ui/SearchBar/SearchBar'
import Button from '@/components/ui/Button/Button'
import { ButtonSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner'
import { useState, useEffect } from 'react'
import styles from './Header.module.scss'
import { useUIStore } from '@/store/uiStore'
import { useRouter } from 'next/navigation'
import { 
  Settings,
  Menu,
  Search,
  X
} from 'lucide-react'

export default function Header() {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { data: user } = useCurrentUser()
  const logout = useLogout()
  const { toggleSidebar } = useUIStore()
  const router = useRouter()

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 420)
    }
    if (window.innerWidth < 420) {
      setUserMenuOpen(false)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLogout = () => {
    logout.mutate()
    setUserMenuOpen(false)
  }

  const handleSearch = (query: string) => {
    // 나중에 검색 기능 구현할 때 사용
    console.log('검색:', query)
    setSearchOpen(false)
  }

  const handleSidebarToggle = () => {
    toggleSidebar()
  }

  const handleLogoClick = () => {
    router.push('/home')
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.leftSection}>
          {/* 사이드바 토글 버튼 */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSidebarToggle}
            className={styles.sidebarToggle}
            aria-label="사이드바 토글"
          >
            <Menu size={20} />
          </Button>

          {/* 로고 */}
          <div className="group cursor-pointer" onClick={handleLogoClick}>
            <div className="flex items-center space-x-2">
              <div className={`${styles.logoIcon} w-8 h-8 flex items-center justify-center group-hover:rotate-180 transition-transform duration-500`}>
                <span className="text-white font-bold text-2xl">🔗</span>
              </div>
              <h1 className={`${styles.logoText} text-3xl font-semibold text-accent`}>
                Trailink
              </h1>
            </div>
          </div>
        </div>

        {/* 데스크탑: 검색바 / 모바일: 검색 아이콘 */}
        {!isMobile ? (
          <div className={styles.centerSection}>
            <SearchBar
              placeholder="Search..."
              onSearch={handleSearch}
            />
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchOpen(true)}
            className={styles.searchButton}
            aria-label="검색"
          >
            <Search size={23} />
          </Button>
        )}

        {/* 데스크탑에서만 프로필 표시 */}
        {!isMobile && (
          <div className={styles.rightSection}>
            {/* 사용자 프로필 드롭다운 */}
            <div className={styles.userMenu}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={styles.userButton}
              >
                <div className={styles.userAvatar}>
                  {user?.user_name.charAt(0).toUpperCase() || 'U'}
                </div>
              </Button>

              {userMenuOpen && (
                <div className={styles.userDropdown}>
                  <div className={styles.userInfo}>
                    <div className={styles.userId}>{user?.user_id}</div>
                  </div>
                  <hr className={styles.divider} />
                  <button className={`${styles.menuItem} flex items-center gap-2`}>
                    <Settings size={18} />
                    설정
                  </button>
                  <button 
                    className={`${styles.menuItem} ${styles.logout}`}
                    onClick={handleLogout}
                    disabled={logout.isPending}
                  >
                    <div className="flex items-center gap-2">
                      {logout.isPending && <ButtonSpinner size="sm" />}
                      <span>{logout.isPending ? '로그아웃 중...' : '로그아웃'}</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
          )}
      </header>

      {/* 모바일 전체화면 검색 오버레이 */}
      {isMobile && searchOpen && (
        <div className={styles.searchOverlay}>
          <div className={styles.searchHeader}>
            <SearchBar
              placeholder="Search..."
              onSearch={handleSearch}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(false)}
              aria-label="닫기"
            >
              <X size={24} />
            </Button>
          </div>
          {/* 검색 결과가 여기 표시됨 */}
        </div>
      )}
    </>
  )
}
