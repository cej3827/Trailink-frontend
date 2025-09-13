// 글로벌 UI(모달 등)
import { create } from 'zustand'

interface UIState {
  // 사이드바 상태
  sidebarOpen: boolean
  
  // 모달 상태들
  bookmarkFormOpen: boolean
  categoryFormOpen: boolean
  
  // 모바일 메뉴
  mobileMenuOpen: boolean
  showLoginForm: boolean
  
  // 사이드바 액션들
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  openSidebar: () => void    // 추가
  closeSidebar: () => void   // 추가
  
  // 북마크 폼 액션들
  openBookmarkForm: () => void
  closeBookmarkForm: () => void
  
  // 카테고리 폼 액션들
  openCategoryForm: () => void
  closeCategoryForm: () => void
  
  // 모바일 메뉴 액션들
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  
  // 로그인 폼 액션들
  setShowLoginForm: (show: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  // 초기 상태
  sidebarOpen: true,
  bookmarkFormOpen: false,
  categoryFormOpen: false,
  mobileMenuOpen: false,
  showLoginForm: false,

  // 사이드바 관리
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  openSidebar: () => set({ sidebarOpen: true }),     // 추가
  closeSidebar: () => set({ sidebarOpen: false }),   // 추가

  // 북마크 폼 모달 관리
  openBookmarkForm: () => set({ bookmarkFormOpen: true }),
  closeBookmarkForm: () => set({ bookmarkFormOpen: false }),

  // 카테고리 폼 모달 관리
  openCategoryForm: () => set({ categoryFormOpen: true }),
  closeCategoryForm: () => set({ categoryFormOpen: false }),

  // 모바일 메뉴 관리
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),

  // 로그인 폼 관리
  setShowLoginForm: (show) => set({ showLoginForm: show }),
}))
