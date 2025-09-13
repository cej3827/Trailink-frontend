'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as categoryAPI from '@/api/categoryAPI'
import { QUERY_KEYS } from '@/lib/constants'
import { Category } from '@/types'
import { toast } from 'react-hot-toast'

/**
 * 사용자의 모든 카테고리 목록을 가져오는 훅
 */
export function useCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORIES,
    queryFn: categoryAPI.getCategories,
    staleTime: 5 * 60 * 1000, // 5분간 캐시
  })
}

// /**
//  * 특정 카테고리 정보를 가져오는 훅
//  */
// export function useCategory(categoryId: string) {
//   return useQuery({
//     queryKey: QUERY_KEYS.CATEGORY(categoryId),
//     queryFn: () => categoryAPI.getCategoryById(categoryId),
//     enabled: !!categoryId, // categoryId가 있을 때만 실행
//     staleTime: 5 * 60 * 1000,
//   })
// }

/**
 * 카테고리 생성 뮤테이션 훅
 */
export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: categoryAPI.createCategory,
    onSuccess: (newCategory) => {
      // 카테고리 목록 캐시 업데이트
      queryClient.setQueryData<Category[]>(QUERY_KEYS.CATEGORIES, (oldData) => {
        if (!oldData) return [newCategory]
        return [...oldData, newCategory]
      })

      // 카테고리 목록 다시 불러오기 (최신 데이터 보장)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CATEGORIES })

      toast.success('카테고리가 생성되었습니다.')
    },
    onError: (error: Error) => {
      toast.error(error.message || '카테고리 생성에 실패했습니다.')
    },
  })
}

// /**
//  * 카테고리 수정 뮤테이션 훅
//  */
// export function useUpdateCategory() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: ({ categoryId, data }: { categoryId: string; data: UpdateCategoryData }) =>
//       categoryAPI.updateCategory(categoryId, data),
//     onSuccess: (updatedCategory, { categoryId }) => {
//       // 개별 카테고리 캐시 업데이트
//       queryClient.setQueryData(QUERY_KEYS.CATEGORY(categoryId), updatedCategory)

//       // 카테고리 목록 캐시 업데이트
//       queryClient.setQueryData<Category[]>(QUERY_KEYS.CATEGORIES, (oldData) => {
//         if (!oldData) return [updatedCategory]
//         return oldData.map((category) =>
//           category.id === categoryId ? updatedCategory : category
//         )
//       })

//       // 관련 북마크 쿼리도 무효화 (카테고리 이름이 바뀌었을 수 있음)
//       queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BOOKMARKS_BY_CATEGORY(categoryId) })

//       toast.success('카테고리가 수정되었습니다.')
//     },
//     onError: (error: Error) => {
//       toast.error(error.message || '카테고리 수정에 실패했습니다.')
//     },
//   })
// }

// /**
//  * 카테고리 삭제 뮤테이션 훅
//  */
// export function useDeleteCategory() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: categoryAPI.deleteCategory,
//     onSuccess: (_, categoryId) => {
//       // 개별 카테고리 캐시 삭제
//       queryClient.removeQueries({ queryKey: QUERY_KEYS.CATEGORY(categoryId) })

//       // 카테고리 목록에서 삭제된 카테고리 제거
//       queryClient.setQueryData<Category[]>(QUERY_KEYS.CATEGORIES, (oldData) => {
//         if (!oldData) return []
//         return oldData.filter((category) => category.id !== categoryId)
//       })

//       // 해당 카테고리의 북마크 쿼리도 무효화
//       queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BOOKMARKS_BY_CATEGORY(categoryId) })

//       toast.success('카테고리가 삭제되었습니다.')
//     },
//     onError: (error: Error) => {
//       toast.error(error.message || '카테고리 삭제에 실패했습니다.')
//     },
//   })
// }

// /**
//  * 카테고리 공개/비공개 토글 뮤테이션 훅
//  */
// export function useToggleCategoryPublic() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: ({ categoryId, isPublic }: { categoryId: string; isPublic: boolean }) =>
//       categoryAPI.updateCategory(categoryId, { isPublic }),
//     onSuccess: (updatedCategory, { categoryId }) => {
//       // 개별 카테고리 캐시 업데이트
//       queryClient.setQueryData(QUERY_KEYS.CATEGORY(categoryId), updatedCategory)

//       // 카테고리 목록 캐시 업데이트
//       queryClient.setQueryData<Category[]>(QUERY_KEYS.CATEGORIES, (oldData) => {
//         if (!oldData) return [updatedCategory]
//         return oldData.map((category) =>
//           category.id === categoryId ? updatedCategory : category
//         )
//       })

//       toast.success(
//         updatedCategory.isPublic ? '카테고리가 공개되었습니다.' : '카테고리가 비공개되었습니다.'
//       )
//     },
//     onError: (error: Error) => {
//       toast.error(error.message || '카테고리 공개 설정 변경에 실패했습니다.')
//     },
//   })
// }

// /**
//  * 공개 카테고리 정보를 가져오는 훅 (slug 기반)
//  */
// export function usePublicCategory(slug: string) {
//   return useQuery({
//     queryKey: QUERY_KEYS.PUBLIC_CATEGORY(slug),
//     queryFn: () => categoryAPI.getPublicCategoryBySlug(slug),
//     enabled: !!slug,
//     staleTime: 10 * 60 * 1000, // 10분간 캐시 (공개 페이지는 더 오래 캐시)
//     retry: false, // 404 에러 시 재시도하지 않음
//   })
// }

// /**
//  * 카테고리별 북마크 개수를 포함한 카테고리 목록
//  */
// export function useCategoriesWithCount() {
//   return useQuery({
//     queryKey: QUERY_KEYS.CATEGORIES_WITH_COUNT,
//     queryFn: categoryAPI.getCategoriesWithCount,
//     staleTime: 5 * 60 * 1000,
//   })
// }
