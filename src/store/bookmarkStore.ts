// 선택/검색/뷰모드 등 UI 상태

import { create } from 'zustand'

type ViewMode = 'grid' | 'list'
type SortBy = 'createdAt' | 'title' | 'updatedAt'
type SortOrder = 'asc' | 'desc'

interface BookmarkUIState {
  // 선택된 북마크들 (다중 선택용)
  selectedIds: string[]
  
  // 검색 및 필터링
  searchQuery: string
  selectedCategoryId: string | null
  
  // 뷰 설정
  viewMode: ViewMode
  sortBy: SortBy
  sortOrder: SortOrder
  
  // 페이지네이션
  currentPage: number
  
  // 북마크 선택 관리
  toggleSelected: (id: string) => void
  selectAll: (ids: string[]) => void
  clearSelection: () => void
  isSelected: (id: string) => boolean
  
  // 검색 및 필터
  setSearchQuery: (query: string) => void
  setSelectedCategory: (categoryId: string | null) => void
  
  // 뷰 설정
  setViewMode: (mode: ViewMode) => void
  setSortBy: (sortBy: SortBy) => void
  setSortOrder: (order: SortOrder) => void
  toggleSortOrder: () => void
  
  // 페이지네이션
  setCurrentPage: (page: number) => void
  resetPagination: () => void
}

export const useBookmarkUIStore = create<BookmarkUIState>((set, get) => ({
  // 초기 상태
  selectedIds: [],
  searchQuery: '',
  selectedCategoryId: null,
  viewMode: 'grid',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  currentPage: 1,

  // 북마크 선택 관리 - 체크박스용
  toggleSelected: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((selectedId) => selectedId !== id)
        : [...state.selectedIds, id],
    })),

  selectAll: (ids) => set({ selectedIds: ids }),
  clearSelection: () => set({ selectedIds: [] }),
  isSelected: (id) => get().selectedIds.includes(id),

  // 검색 및 필터 - 상단 검색바용
  setSearchQuery: (query) => set({ 
    searchQuery: query, 
    currentPage: 1 // 검색 시 첫 페이지로 리셋
  }),
  
  setSelectedCategory: (categoryId) => set({ 
    selectedCategoryId: categoryId,
    currentPage: 1 // 카테고리 변경 시 첫 페이지로
  }),

  // 뷰 설정 - 그리드/리스트 토글용
  setViewMode: (mode) => set({ viewMode: mode }),
  setSortBy: (sortBy) => set({ sortBy, currentPage: 1 }),
  setSortOrder: (order) => set({ sortOrder: order, currentPage: 1 }),
  toggleSortOrder: () => set((state) => ({ 
    sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
    currentPage: 1
  })),

  // 페이지네이션
  setCurrentPage: (page) => set({ currentPage: page }),
  resetPagination: () => set({ currentPage: 1 }),
}))
