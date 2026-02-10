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
    <div className="w-full p-4 sm:p-6">
      {/* 상단 미세 그라데이션 바 */}
      <div
        className="mb-4 h-1 w-full rounded-full bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200"
        aria-hidden="true"
      />
      {/* 헤더 영역 */}
      <div className="relative mt-3 mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-medium text-primary">Recent Bookmarks</h2>
            <span className="h-px w-10 bg-neutral-300" aria-hidden="true" />
            <span className="h-1 w-1 rounded-full bg-neutral-400" aria-hidden="true" />
          </div>
        </div>
        <button 
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-sm font-medium text-primary shadow-sm hover:bg-neutral-100 hover:border-neutral-300 hover:text-accent transition-all duration-200"
          onClick={handleAddBookmark}
          aria-label="북마크 추가"
        >
          <CirclePlus size={18} />
          <span>북마크 추가</span>
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
            className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-5 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-neutral-100 hover:border-neutral-300 hover:text-accent transition-colors"
          >
            <CirclePlus size={18} />
            첫 번째 북마크 추가하기
          </button>
        }
      />
    </div>
  )
}
