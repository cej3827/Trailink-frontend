import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as bookmarkAPI from '@/api/bookmarkAPI'
import { CreateBookmarkData, UpdateBookmarkData } from '@/types'
import { toast } from 'react-hot-toast'

/**
 * 북마크 목록을 가져오는 훅 (페이지네이션 지원)
 */
// export function useBookmarks(params?: {
//   categoryId?: string
//   search?: string
//   page?: number
//   limit?: number
// }) {
//   return useQuery({
//     queryKey: [...QUERY_KEYS.BOOKMARKS, params],
//     queryFn: () => apiClient.getBookmarks(params),
//     staleTime: 2 * 60 * 1000, // 2분간 캐시 (북마크는 자주 변경됨)
//     keepPreviousData: true, // 페이지 전환 시 이전 데이터 유지
//   })
// }

/**
 * 최근 북마크를 가져오는 훅 (홈페이지용)
 */
export function useRecentBookmarks(limit = 12) {
  return useQuery({
    queryKey: ['bookmarks', 'recent', limit],
    queryFn: () => bookmarkAPI.getRecentBookmarks(limit),
    staleTime: 5 * 60 * 1000, // 5분 동안 fresh 상태 유지
    gcTime: 30 * 60 * 1000,   // 30분 동안 캐시 유지
  })
}

/**
 * 공개 북마크를 가져오는 훅
 */
// export function usePublicBookmarks(categoryId: string) {
//   return useQuery({
//     queryKey: [...QUERY_KEYS.BOOKMARKS, 'public', categoryId],
//     queryFn: () => apiClient.getPublicBookmarks(categoryId),
//     enabled: !!categoryId, // categoryId가 있을 때만 실행
//     staleTime: 10 * 60 * 1000,
//   })
// }

/**
 * 북마크 생성 뮤테이션 훅
 */
export function useCreateBookmark() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBookmarkData) => bookmarkAPI.createBookmark(data),
    onSuccess: async () => {
      // 북마크 목록들 새로고침
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
      
      // // 카테고리 목록도 새로고침 (북마크 개수 업데이트)
      // queryClient.invalidateQueries({ queryKey: ['categories'] })
      
      toast.success('카테고리가 생성되었습니다.')
      // // Optimistic update - 즉시 UI에 반영
      // queryClient.setQueryData(
      //   [...['bookmarks'], 'recent'],
      //   (oldData: any) => {
      //     if (!oldData) return [newBookmark]
      //     return [newBookmark, ...oldData.slice(0, 7)] // 최신 8개만 유지
      //   }
      // )
    },
    onError: (error: Error) => {
      toast.error(error.message || '카테고리 생성에 실패했습니다.')
    },
  })
}

/**
 * 북마크 수정 뮤테이션 훅
 */
export function useUpdateBookmark() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBookmarkData }) =>
      bookmarkAPI.updateBookmark(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}

/**
 * 북마크 삭제 뮤테이션 훅
 */
// export function useDeleteBookmark() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (id: string) => apiClient.deleteBookmark(id),
//     onMutate: async (deletedId) => {
//       // Optimistic update - 삭제 전에 UI에서 먼저 제거
//       await queryClient.cancelQueries({ queryKey: QUERY_KEYS.BOOKMARKS })

//       // 이전 데이터 백업
//       const previousBookmarks = queryClient.getQueryData(QUERY_KEYS.BOOKMARKS)

//       // UI에서 즉시 제거
//       queryClient.setQueriesData(
//         { queryKey: QUERY_KEYS.BOOKMARKS },
//         (oldData: any) => {
//           if (!oldData?.data) return oldData
//           return {
//             ...oldData,
//             data: oldData.data.filter((bookmark: any) => bookmark.id !== deletedId)
//           }
//         }
//       )

//       return { previousBookmarks }
//     },
//     onError: (err, deletedId, context) => {
//       // 에러 발생 시 이전 상태로 복원
//       if (context?.previousBookmarks) {
//         queryClient.setQueryData(QUERY_KEYS.BOOKMARKS, context.previousBookmarks)
//       }
//     },
//     onSettled: () => {
//       // 성공/실패 관계없이 최종적으로 서버에서 새로 가져오기
//       queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BOOKMARKS })
//       queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CATEGORIES })
//     },
//   })
// }


// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import * as bookmarkAPI from '@/api/bookmarkAPI'  // 간단하게 import
// // import { QUERY_KEYS } from '@/lib/constants'

// export function useBookmarks(params?: {
//   categoryId?: string
//   search?: string
//   page?: number
//   limit?: number
// }) {
//   return useQuery({
//     queryKey: [...['bookmarks'], params],
//     queryFn: () => bookmarkAPI.getBookmarks(params),  // 간단한 호출
//     staleTime: 2 * 60 * 1000,
//   })
// }

// export function useCreateBookmark() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: bookmarkAPI.createBookmark,  // 더 간단함
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
//     },
//   })
// }
