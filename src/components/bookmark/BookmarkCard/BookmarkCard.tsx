'use client'

import { Bookmark } from '@/types'
import { Edit2, Trash2 } from 'lucide-react'

type ViewMode = 'card' | 'list'

interface BookmarkCardProps {
  bookmark: Bookmark
  viewMode?: ViewMode
  isOwner?: boolean
  onEdit?: (bookmark: Bookmark) => void
  onDelete?: (bookmarkId: string | number) => void
  onClick?: (url: string) => void
}

export default function BookmarkCard({
  bookmark,
  viewMode = 'card',
  isOwner = false,
  onEdit,
  onDelete,
  onClick
}: BookmarkCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(bookmark.bookmark_url)
    } else {
      window.open(bookmark.bookmark_url, '_blank')
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit?.(bookmark)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete?.(bookmark.bookmark_id)
  }

  return (
    <div
      onClick={handleClick}
      className={`relative group cursor-pointer transition-all duration-200 hover:shadow-lg ${
        viewMode === 'card'
          ? 'bg-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300'
          : 'bg-white border border-neutral-200 rounded-lg p-4 hover:border-neutral-300'
      }`}
    >
      {/* 소유자에게만 보이는 수정/삭제 버튼 */}
      {isOwner && (onEdit || onDelete) && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          {onEdit && (
            <button
              onClick={handleEdit}
              className="p-1.5 bg-white rounded-md shadow-md hover:bg-neutral-100 transition-colors"
              aria-label="북마크 수정"
            >
              <Edit2 size={14} className="text-secondary" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="p-1.5 bg-white rounded-md shadow-md hover:bg-red-50 transition-colors"
              aria-label="북마크 삭제"
            >
              <Trash2 size={14} className="text-danger" />
            </button>
          )}
        </div>
      )}

      {viewMode === 'card' ? (
        <>
          {/* 썸네일 영역 */}
          <div className="w-full h-20 rounded-md mb-3 flex items-center justify-center">
            <div className="text-neutral-400 text-2xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>

          {/* 북마크 정보 */}
          <div className="space-y-2">
            <h3 className="font-medium text-accent text-sm group-hover:text-primary transition-colors line-clamp-2">
              {bookmark.bookmark_title}
            </h3>
            <p className="text-xs text-secondary line-clamp-2">
              {bookmark.bookmark_description}
            </p>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-md bg-neutral-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-accent group-hover:text-primary transition-colors truncate">
              {bookmark.bookmark_title}
            </h3>
            <p className="text-sm text-secondary mt-1 line-clamp-1">
              {bookmark.bookmark_description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
