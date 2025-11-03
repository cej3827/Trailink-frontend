// 글로벌 UI(모달 등)
import { Bookmark, Category } from '@/types'
import { create } from 'zustand'

interface UIState {
  // 사이드바 상태
  sidebarOpen: boolean
  
  // 모달 상태들
  bookmarkFormOpen: boolean
  categoryFormOpen: boolean
  
  // 모달 데이터
  editingBookmark: Bookmark | null
  editingCategory: Category | null
  selectedCategoryId: string | null
  
  // 모바일 메뉴
  mobileMenuOpen: boolean
  showLoginForm: boolean
  
  // 사이드바 액션들
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  openSidebar: () => void
  closeSidebar: () => void
  
  // 북마크 모달 액션들
  closeBookmarkForm: () => void
  openBookmarkModal: (categoryId?: string, bookmark?: Bookmark) => void
  
  // 카테고리 모달 액션들
  closeCategoryForm: () => void
  openCategoryModal: (mode: 'create' | 'edit', category?: Category) => void
  
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
  editingBookmark: null,
  editingCategory: null,
  selectedCategoryId: null,
  mobileMenuOpen: false,
  showLoginForm: false,

  // 사이드바 관리
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  openSidebar: () => set({ sidebarOpen: true }),    
  closeSidebar: () => set({ sidebarOpen: false }),  

  // 북마크 모달 관리
  closeBookmarkForm: () => set({ 
    bookmarkFormOpen: false, 
    editingBookmark: null,
    selectedCategoryId: null 
  }),
  openBookmarkModal: (categoryId?: string, bookmark?: Bookmark) => set({ 
    bookmarkFormOpen: true,
    selectedCategoryId: categoryId || null,
    editingBookmark: bookmark || null
  }),

  // 카테고리 모달 관리
  closeCategoryForm: () => set({ 
    categoryFormOpen: false,
    editingCategory: null 
  }),
  openCategoryModal: (mode: 'create' | 'edit', category?: Category) => set({ 
    categoryFormOpen: true,
    editingCategory: mode === 'edit' ? category : null
  }),

  // 모바일 메뉴 관리
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),

  // 로그인 폼 관리
  setShowLoginForm: (show) => set({ showLoginForm: show }),
}))
