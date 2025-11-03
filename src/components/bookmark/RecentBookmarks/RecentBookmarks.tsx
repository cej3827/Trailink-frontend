// 최근 북마크 섹션 (클라이언트)
'use client'

import { CirclePlus } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { useRecentBookmarks } from '@/hooks/useBookmarks'
import BookmarkGridView from '@/components/bookmark/BookmarkGrid/BookmarkGrid'
import BookmarkSkeleton from '@/components/ui/BookmarkSkeleton/BookmarkSkeleton'

export default function RecentBookmarks() {
  const { data: bookmarks, isLoading, error } = useRecentBookmarks(12)
  const { openBookmarkModal } = useUIStore()

  const handleAddBookmark = () => {
    openBookmarkModal() // 빈 모달 열기 (새 북마크 추가)
  }

  const handleBookmarkClick = (url: string) => {
    window.open(url, '_blank')
  }

  if (isLoading) {
    return <BookmarkSkeleton count={8} title="Recent Bookmarks" />
  }

  if (error) {
    return <div className="w-full p-6 text-center text-red-600">최근 북마크를 불러올 수 없습니다.</div>
  }

  return (
    <div className="w-full p-6">
      {/* 헤더 영역 */}
      <div className="flex items-center mt-3 mb-6 gap-3">
        <h2 className="text-xl font-medium text-primary">Recent Bookmarks</h2>
        <button 
          className="flex items-center text-primary rounded-full hover:text-accent hover:scale-105 transition-all duration-200"
          onClick={handleAddBookmark}
          aria-label="북마크 추가"
        >
          <CirclePlus size={30} />
        </button>
      </div>

      {/* 북마크 그리드 - 공통 컴포넌트 사용 */}
      <BookmarkGridView
        bookmarks={bookmarks || []}
        viewMode="card"
        onBookmarkClick={handleBookmarkClick}
        emptyMessage="최근 북마크가 없습니다."
        emptyActionButton={
          <button
            onClick={handleAddBookmark}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            첫 번째 북마크 추가하기
          </button>
        }
      />
    </div>
  )
}
