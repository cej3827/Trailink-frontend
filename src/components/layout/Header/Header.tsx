// 검색/프로필
'use client'

import { useCurrentUser, useLogout } from '@/hooks/useAuth'
import SearchBar from '@/components/ui/SearchBar/SearchBar'
import Button from '@/components/ui/Button/Button'
import { useState } from 'react'
import styles from './Header.module.scss'
import { useUIStore } from '@/store/uiStore'
import { 
  Settings,
  Menu,
} from 'lucide-react'


export default function Header() {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { data: user } = useCurrentUser()
  const logout = useLogout()
  const { toggleSidebar } = useUIStore()

  const handleLogout = () => {
    logout.mutate()
    setUserMenuOpen(false)
  }

  const handleSearch = (query: string) => {
    // 나중에 검색 기능 구현할 때 사용
    console.log('검색:', query)
  }

  const handleSidebarToggle = () => {
    toggleSidebar()
  }

  return (
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
        <div className="group cursor-pointer">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
              <span className="text-white font-bold text-2xl">🔗</span>
            </div>
            <h1 className="text-3xl font-semibold text-slate-800 group-hover:tracking-wider transition-all duration-300">
              Trailink
            </h1>
          </div>
        </div>
      </div>


      <div className={styles.centerSection}>
        <SearchBar
          placeholder="Search..."
          onSearch={handleSearch}
        />
      </div>

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
                {logout.isPending ? '로그아웃 중...' : '로그아웃'}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
