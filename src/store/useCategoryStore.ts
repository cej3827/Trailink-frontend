const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import { create } from 'zustand'; // 상태관리 훅 생성
import { useUserStore } from './useUserStore';
import { addCategory } from '../api/categoryAPI';

interface Bookmark {
  bookmark_id: number;
  bookmark_title: string;
  bookmark_url: string;
  bookmark_description: string;
}

interface CategoryBookmark {
  category_id: number;
  category_name: string;
  bookmarks: Bookmark[];
}

interface Category {
  category_id: number;
  category_name: string;
  category_description: string;
}

// 상태 관리 인터페이스
interface CategoryState {
  categories: Category[], // 전체 카테고리 목록
  categoryBookmarks: CategoryBookmark[];  // 각 카테고리별 북마크 목록
  fetchCategoryBookmark: (categoryId: number) => Promise<CategoryBookmark | null>; // 특정 카테고리의 북마크 가져오기
  fetchCategories: (userId: string) => Promise<void>; // 모든 카테고리 가져오기
  addCategory: (category: Category) => void;
}

// 상태 관리 훅 생성
export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [], //카테고리 상태 초기화
  categoryBookmarks: [], // 카테고리별 북마크 상태 초기화

  //특정 카테고리의 북마크를 가져오는 함수
  fetchCategoryBookmark: async (categoryId: number) => {
    try {
      // 서버에서 특정 카테고리 북마크 데이터를 가져옴
      const response = await fetch(`${API_BASE_URL}/api/categories/${categoryId}`);
      if (!response.ok) throw new Error('Failed to fetch category');
      const categoryBookmark: CategoryBookmark = await response.json();

      // 상태 업데이트
      set((state) => {
        const existingCategory = state.categoryBookmarks.find((c) => c.category_id === categoryId);
        if (existingCategory) {
          // 이미 존재하는 경우 상태를 업데이트하지 않음
          return state;
        }
        // 새로운 카테고리 북마크 데이터를 상태에 추가
        return {
          categoryBookmarks: [...state.categoryBookmarks, categoryBookmark],
        };
      });

      // 가져온 카테고리 북마크 데이터 반환
      return categoryBookmark;
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
  },

  // 사용자의 모든 카테고리 가져오는 함수
  fetchCategories: async (userId) => {
    try {
      // 사용자 토큰을 상태에서 가져옴
      const token = useUserStore.getState().token;
      if (!token) {
        console.warn('No token found. Please log in.');
        return; // 토큰 없으면 로그인
      }

      // api 호출
      const response = await fetch(`${API_BASE_URL}/api/categories?userId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // 헤더에 토큰 포함
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch categories');
      const allCategories: Category[] = await response.json();

      // 받은 카테고리 데이터가 배열 형식인지 확인
      if (!Array.isArray(allCategories)) {
        throw new Error('categories is not an array');
      }

      // 상태에 카테고리 데이터를 설정
      set(() => ({
        categories: allCategories,
      }));
    } catch (error) {
      console.error('Error fetching all categories:', error);
    }
  },

  addCategory: async (category: Category) => {
    try {
      const newCategory = await addCategory(category);
      set((state) => ({
        categories: [...state.categories, category]
      }));
    } catch(error) {
      console.error('Error add category: ', error);
    }
  }
  // addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
}));
