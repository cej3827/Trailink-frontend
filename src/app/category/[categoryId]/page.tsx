'use client'

import { useParams } from 'next/navigation'
import { useBookmarksByCategory } from '@/hooks/useBookmarks'
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout/AuthenticatedLayout'
import PublicHeader from '@/components/layout/Header/PublicHeader'
import CategoryBookmarksView from '@/components/category/CategoryBookmarksView/CategoryBookmarksView'
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner'
import { useCurrentUser } from '@/hooks/useAuth'

export default function CategoryBookmarksPage() {
  const params = useParams()
  const categoryId = params.categoryId as string

  // useCurrentUser 사용 (카테고리 페이지에서는 에러 처리 안 함)
  const { data: user } = useCurrentUser()

  const { data: CategoryBookmarksData, isLoading: CategoryBookmarksLoading} = useBookmarksByCategory(
    categoryId,
    { page: 1, limit: 12, sortBy: 'latest' }
  )

  // 북마크 데이터에서 카테고리 정보 추출
  const currentCategory = (CategoryBookmarksData)?.category
  
  // 소유자 여부 확인
  const isOwner = user && currentCategory && currentCategory.user_id === user.user_id

  // 로딩 중
  if (CategoryBookmarksLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <LoadingSpinner />
      </div>
    )
  }

  // 소유자인 경우 AuthenticatedLayout으로 감싸기
  if (isOwner) {
    return (
      <AuthenticatedLayout>
        <CategoryBookmarksView 
          categoryId={categoryId} 
          isOwner={true}
        />
      </AuthenticatedLayout>
    )
  }

  // 방문자인 경우 공개 페이지
  return (
    <div className="min-h-screen">
      <PublicHeader />
      <div className="max-w-7xl mx-auto">
        <CategoryBookmarksView 
          categoryId={categoryId} 
          isOwner={false}
        />
      </div>
    </div>
  )
}

