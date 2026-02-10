'use client'

import { useCurrentUser, useLogout } from '@/hooks/useAuth'
import SearchBar from '@/components/ui/SearchBar/SearchBar'
import Button from '@/components/ui/Button/Button'
import { ButtonSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner'
import { useState, useEffect } from 'react'
import { useUIStore } from '@/store/uiStore'
import { useRouter } from 'next/navigation'
import { Settings, Menu, Search, X, LogOut } from 'lucide-react'

export default function Header() {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { data: user } = useCurrentUser()
  const logout = useLogout()
  const { toggleSidebar } = useUIStore()
  const router = useRouter()

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) setUserMenuOpen(false)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 스크롤 감지
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout.mutate()
    setUserMenuOpen(false)
  }

  const handleSearch = (query: string) => {
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
      <header
        className={[
          'sticky top-0 z-50 border-b border-neutral-300 transition-all duration-300',
          scrolled
            ? 'bg-neutral-100/85 backdrop-blur supports-[backdrop-filter]:bg-neutral-100/80 shadow-sm'
            : 'bg-neutral-100',
        ].join(' ')}
      >
        <div className="mx-auto px-4 sm:px-2 lg:px-4">
          <div
            className={[
              'relative flex items-center justify-between transition-all duration-300',
              scrolled ? 'h-16' : 'h-20',
            ].join(' ')}
          >
            {/* leftSection */}
            <div className="flex items-center gap-3">
              {/* 사이드바 토글 버튼 */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSidebarToggle}
                className="inline-flex items-center justify-center"
                aria-label="사이드바 토글"
              >
                <Menu size={20} />
              </Button>

            {/* 로고 (모바일 중앙 정렬) */}
            <div
              className={[
                'group cursor-pointer select-none',
                isMobile ? 'absolute left-1/2 -translate-x-1/2' : '',
              ].join(' ')}
              onClick={handleLogoClick}
              role="button"
              tabIndex={0}
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                  <span className="text-white font-bold text-2xl">🔗</span>
                </div>
                {!isMobile && (
                  <h1 className="text-2xl font-semibold tracking-[-0.02em] text-primary">Trailink</h1>
                )}
              </div>
            </div>
            </div>

            {/* centerSection (데스크탑만) / 모바일: 검색 아이콘 */}
            {!isMobile ? (
              <div className="hidden md:block w-[420px] max-w-[45vw]">
                <SearchBar placeholder="Search..." onSearch={handleSearch} />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(true)}
                className="inline-flex items-center justify-center"
                aria-label="검색"
              >
                <Search size={23} />
              </Button>
            )}

            {/* rightSection (데스크탑에서만 프로필 표시) */}
            {!isMobile && (
              <div className="flex items-center">
                {/* 사용자 프로필 드롭다운 */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="inline-flex items-center justify-center"
                  >
                    <div className="w-9 h-9 rounded-full bg-neutral-200 text-neutral-800 flex items-center justify-center font-semibold">
                      {user?.user_name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  </Button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow-lg overflow-hidden">
                      <div className="px-4 py-3">
                        <div className="text-sm text-neutral-500 py-1">User</div>
                        <div className="text-sm font-semibold text-neutral-900 truncate">
                          {user?.user_id}
                        </div>
                      </div>
                      <div className="h-px bg-neutral-200" />

                      <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-neutral-50 flex items-center gap-2">
                        <Settings size={18} />
                        설정
                      </button>

                      <button
                        className="w-full px-4 py-2.5 text-left text-sm hover:bg-neutral-50 text-red-600 disabled:opacity-60"
                        onClick={handleLogout}
                        disabled={logout.isPending}
                      >
                        <div className="flex items-center gap-2">
                          {logout.isPending && <ButtonSpinner size="sm" />}
                          <LogOut size={18} />
                          <span>{logout.isPending ? '로그아웃 중...' : '로그아웃'}</span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 모바일 전체화면 검색 오버레이 */}
      {isMobile && searchOpen && (
        <div className="fixed inset-0 z-[60] bg-neutral-50 flex flex-col">
          <div className="border-b">
            <div className="min-h-[4rem] px-4 pb-0 flex items-center gap-1">
              <div className="flex-1 min-w-0">
              <SearchBar placeholder="Search..." onSearch={handleSearch} />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(false)}
                aria-label="닫기"
                className="shrink-0"
              >
                <X size={24} />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
            {/* 검색 결과가 여기 표시됨 */}
          </div>
        </div>
      )}
    </>
  )
}
