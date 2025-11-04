'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as categoryAPI from '@/api/categoryAPI'
import { CreateCategoryData} from '@/types'
import { toast } from 'react-hot-toast'


// 사용자의 모든 카테고리 목록을 가져오는 훅
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const result = await categoryAPI.getCategories()
      return result
    },
    placeholderData: [],
    staleTime: 30 * 60 * 1000, // 30분 동안 fresh 상태 유지
    gcTime: 24 * 60 * 60 * 1000, // 24시간 동안 캐시 유지
    retry: false, // 에러 시 재시도하지 않음
    throwOnError: false, // 에러를 던지지 않음
  })
}


// 카테고리 생성 뮤테이션
export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCategoryData) => categoryAPI.createCategory(data),
    onSuccess: async () => {
      // 카테고리 목록 다시 불러오기 
      await queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('카테고리가 생성되었습니다.')
    },
    onError: (error: Error) => {
      toast.error(error.message || '카테고리 생성에 실패했습니다.')
    },
  })
}

/**
 * 카테고리 수정 뮤테이션 훅
 */
// export function useUpdateCategory() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: ({ categoryId, data }: { categoryId: string; data: UpdateCategoryData }) =>
//       categoryAPI.updateCategory(categoryId, data),
//     onSuccess: (updatedCategory, { categoryId }) => {
//       // 개별 카테고리 캐시 업데이트
//       queryClient.setQueryData(['categories', categoryId], updatedCategory)

//       // 카테고리 목록 캐시 업데이트
//       queryClient.setQueryData<Category[]>(['categories'], (oldData) => {
//         if (!oldData) return [updatedCategory]
//         return oldData.map((category) =>
//           category.category_id === categoryId ? updatedCategory : category
//         )
//       })

//       // 관련 북마크 쿼리도 무효화 (카테고리 이름이 바뀌었을 수 있음)
//       queryClient.invalidateQueries({ queryKey: ['bookmarks', 'category', categoryId] })

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