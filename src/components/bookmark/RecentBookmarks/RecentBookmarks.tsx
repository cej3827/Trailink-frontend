// 최근 북마크 섹션 (클라이언트)
'use client'

import { CirclePlus } from 'lucide-react'
import { useUIStore } from '@/store/uiStore';
import { useRecentBookmarks } from '@/hooks/useBookmarks'

export default function RecentBookmarks() {
  const { data: bookmarks, isLoading, error } = useRecentBookmarks(12)
  const { openBookmarkForm } = useUIStore()

  const handleAddBookmark = () => {
    openBookmarkForm() // Zustand 액션 호출
  }

  if (isLoading) {
    return (
      <div className="w-full p-6">
      <div className="flex items-center mt-3 mb-6 gap-3">
        <h2 className="text-xl font-medium text-gray-800">Recent Bookmarks</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
      </div>
    )
  }

  if (error) {
    return <div>최근 북마크를 불러올 수 없습니다.</div>
  }

  console.log('렌더링 상태:', { isLoading, bookmarksCount: bookmarks?.length }) // 디버깅용

  return (
    <div className="w-full p-6">
      {/* 헤더 영역 */}
      <div className="flex items-center mt-3 mb-6 gap-3">
        <h2 className="text-xl font-medium text-gray-800">Recent Bookmarks</h2>
        <button 
          className="flex items-center text-gray-700 rounded-full hover:text-gray-800 hover:scale-105 transition-all duration-200"
          onClick={handleAddBookmark}
          onMouseDown={(e) => e.preventDefault()} // 포커스 자체를 차단
        >
            <CirclePlus size={30} />
        </button>
      </div>

      {/* 북마크 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookmarks?.map((bookmark: { bookmark_id: number; bookmark_url: URL; bookmark_title: string; bookmark_description: string; }) => (
          <div
            key={bookmark.bookmark_id}
            onClick={() => window.open(bookmark.bookmark_url, '_blank')}
            className="relative group bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-blue-300"
          >
            {/* 썸네일 영역 */}
            <div className="w-full h-20 rounded-md mb-3 flex items-center justify-center">
              <div className="text-gray-400 text-2xl">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
            </div>

            {/* 북마크 정보 */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                {bookmark.bookmark_title}
              </h3>
              <p className="text-xs text-gray-600">
                {bookmark.bookmark_description}
              </p>
            </div>

            {/* 메뉴 버튼 */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  console.log('메뉴 클릭:', bookmark.bookmark_description)
                }}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
