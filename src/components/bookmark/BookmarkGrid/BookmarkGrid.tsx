'use client'

import { Bookmark } from '@/types'
import { useUIStore } from '@/store/uiStore'
import BookmarkCard from '../BookmarkCard/BookmarkCard'

type ViewMode = 'card' | 'list'

interface BookmarkGridViewProps {
  bookmarks: Bookmark[]
  viewMode?: ViewMode
  isOwner?: boolean
  onBookmarkClick?: (url: string) => void
  onBookmarkEdit?: (bookmark: Bookmark) => void
  onBookmarkDelete?: (bookmarkId: string | number) => void
  emptyMessage?: string
  emptyActionButton?: React.ReactNode
}

export default function BookmarkGridView({
  bookmarks,
  viewMode = 'card',
  isOwner = false,
  onBookmarkClick,
  onBookmarkEdit,
  onBookmarkDelete,
  emptyMessage = '북마크가 없습니다.',
  emptyActionButton
}: BookmarkGridViewProps) {
  const { sidebarOpen } = useUIStore()

  // 빈 상태
  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-neutral-400 text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-primary mb-2">{emptyMessage}</h3>
        {emptyActionButton}
      </div>
    )
  }

  return (
    <div className={`${
      viewMode === 'card' 
        ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${sidebarOpen ? 'xl:grid-cols-4' : 'xl:grid-cols-5'} gap-4 sm:gap-6` 
        : 'space-y-3 sm:space-y-4'
    }`}>
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.bookmark_id}
          bookmark={bookmark}
          viewMode={viewMode}
          isOwner={isOwner}
          onClick={onBookmarkClick}
          onEdit={onBookmarkEdit}
          onDelete={onBookmarkDelete}
        />
      ))}
    </div>
  )
}
