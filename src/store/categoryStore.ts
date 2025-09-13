// 카테고리 UI(모달)

import { create } from 'zustand'

interface CategoryUIState {
  // 현재 편집중인 카테고리 (수정 시 사용)
  editingCategoryId: string | null
  
  // 카테고리 삭제 확인 모달
  deletingCategoryId: string | null
  
  // 카테고리 선택 (사이드바에서 활성 표시용)
  activeCategoryId: string | null
  
  // 액션들
  setEditingCategory: (id: string | null) => void
  setDeletingCategory: (id: string | null) => void
  setActiveCategory: (id: string | null) => void
  
  // 모든 상태 리셋
  resetCategoryState: () => void
}

export const useCategoryUIStore = create<CategoryUIState>((set) => ({
  // 초기 상태
  editingCategoryId: null,
  deletingCategoryId: null,
  activeCategoryId: null,

  // 카테고리 편집 상태 관리
  setEditingCategory: (id) => set({ editingCategoryId: id }),
  
  // 카테고리 삭제 확인 상태 관리
  setDeletingCategory: (id) => set({ deletingCategoryId: id }),
  
  // 활성 카테고리 설정 (사이드바 하이라이트용)
  setActiveCategory: (id) => set({ activeCategoryId: id }),

  // 모든 상태 초기화
  resetCategoryState: () => set({
    editingCategoryId: null,
    deletingCategoryId: null,
    activeCategoryId: null,
  }),
}))
