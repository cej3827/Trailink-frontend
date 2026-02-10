'use client'

import { useState } from 'react'
import { Grid, List, Share2, ChevronLeft, ChevronRight, CirclePlus, Edit2, Clock, AlarmClock, ArrowDownAZ } from 'lucide-react'
import { useBookmarksByCategory } from '@/hooks/useBookmarks'
import { useUIStore } from '@/store/uiStore'
import BookmarkSkeleton from '@/components/ui/BookmarkSkeleton/BookmarkSkeleton'
import BookmarkGridView from '@/components/bookmark/BookmarkGrid/BookmarkGrid'
import { Bookmark } from '@/types'

type ViewMode = 'card' | 'list'
type SortBy = 'latest' | 'oldest' | 'name'

interface CategoryBookmarksViewProps {
  categoryId: string
  isOwner: boolean
}

export default function CategoryBookmarksView({ 
  categoryId, 
  isOwner 
}: CategoryBookmarksViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('card')
  const [sortBy, setSortBy] = useState<SortBy>('latest')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const { openBookmarkModal, openCategoryModal } = useUIStore()
  const { data: bookmarksData, isLoading, error } = useBookmarksByCategory(categoryId, {
    page: currentPage,
    limit: itemsPerPage,
    sortBy
  })

  // API 응답에서 category 정보 가져오기 (공개 페이지에서도 사용 가능)
  const currentCategory = (bookmarksData)?.category

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentCategory?.category_name} 카테고리`,
          text: `${currentCategory?.category_name} 카테고리의 북마크를 확인해보세요!`,
          url: window.location.href,
        })
      } catch (err) {
        console.log('공유 취소됨: ', err)
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      alert('링크가 클립보드에 복사되었습니다!')
    }
  }

  const handleBookmarkClick = (url: string) => {
    window.open(url, '_blank')
  }

  const handleAddBookmark = () => {
    openBookmarkModal(categoryId)
  }

  const handleEditCategory = () => {
    if (currentCategory) {
      openCategoryModal('edit', currentCategory)
    }
  }

  const handleEditBookmark = (bookmark: Bookmark) => {
    openBookmarkModal(categoryId, bookmark)
  }

  const handleDeleteBookmark = (bookmarkId: string | number) => {
    if (confirm('정말 이 북마크를 삭제하시겠습니까?')) {
      // TODO: 북마크 삭제 뮤테이션 호출
      console.log('북마크 삭제:', bookmarkId)
    }
  }

  const pagination = (bookmarksData)?.pagination
  const totalPages = pagination?.totalPages || 1
  const currentPageFromAPI = pagination?.currentPage || 1
  const bookmarks = (bookmarksData)?.bookmarks || []

  if (isLoading) {
    return (
      <BookmarkSkeleton 
        count={12} 
        title={currentCategory?.category_name || '카테고리'} 
        showHeader={false}
      />
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">오류가 발생했습니다</h2>
          <p className="text-gray-600">북마크를 불러올 수 없습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-4 sm:p-6 pb-24 sm:pb-6">
      {/* 모바일 헤더 */}
      <div className="sm:hidden mb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-gray-800 truncate">
              {currentCategory?.category_name || '카테고리'}
            </h1>
            {currentCategory?.category_description && (
              <p className="mt-1 text-xs text-secondary line-clamp-2">
                {currentCategory.category_description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {isOwner && (
              <button
                onClick={handleEditCategory}
                className="inline-flex items-center justify-center rounded-full p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 transition-all"
                aria-label="카테고리 수정"
                title="수정"
              >
                <Edit2 size={14} />
              </button>
            )}
            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center rounded-full p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 transition-all"
              aria-label="카테고리 공유"
              title="공유"
            >
              <Share2 size={14} />
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-neutral-50 p-1">
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-full transition-all ${
                viewMode === 'card'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-secondary hover:text-neutral-700 hover:bg-white'
              }`}
              aria-label="카드 뷰"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-all ${
                viewMode === 'list'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-secondary hover:text-neutral-700 hover:bg-white'
              }`}
              aria-label="리스트 뷰"
            >
              <List size={16} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1 rounded-full bg-neutral-50 p-1">
            <button
              onClick={() => setSortBy('latest')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                sortBy === 'latest'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-secondary hover:text-neutral-700 hover:bg-white'
              }`}
              aria-label="최신순 정렬"
            >
              <Clock size={12} />
              최신
            </button>
            <button
              onClick={() => setSortBy('oldest')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                sortBy === 'oldest'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-secondary hover:text-neutral-700 hover:bg-white'
              }`}
              aria-label="오래된순 정렬"
            >
              <AlarmClock size={12} />
              오래됨
            </button>
            <button
              onClick={() => setSortBy('name')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                sortBy === 'name'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-secondary hover:text-neutral-700 hover:bg-white'
              }`}
              aria-label="이름순 정렬"
            >
              <ArrowDownAZ size={12} />
              이름
            </button>
          </div>
        </div>
      </div>

      {/* 데스크탑/태블릿 헤더 */}
      <div className="hidden sm:block mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-800">
                {currentCategory?.category_name || '카테고리'}
              </h1>
              <span className="h-px w-10 bg-neutral-300" aria-hidden="true" />
              <span className="h-1 w-1 rounded-full bg-neutral-400" aria-hidden="true" />
            </div>
            
            {/* 북마크 추가 버튼 (소유자만) */}
            {isOwner && (
              <button
                onClick={handleAddBookmark}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-neutral-50 hover:border-neutral-300 hover:text-accent transition-all duration-200"
                aria-label="북마크 추가"
              >
                <CirclePlus size={18} />
                <span>북마크 추가</span>
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-1.5">
            {/* 카테고리 수정 버튼 (소유자만) */}
            {isOwner && (
              <button
                onClick={handleEditCategory}
                className="inline-flex items-center justify-center rounded-full p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 transition-all"
                aria-label="카테고리 수정"
                title="수정"
              >
                <Edit2 size={14} />
              </button>
            )}
            
            {/* 공유 버튼 */}
            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center rounded-full p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-800 transition-all"
              aria-label="카테고리 공유"
              title="공유"
            >
              <Share2 size={14} />
            </button>
          </div>
        </div>

        {/* 카테고리 설명 */}
        {currentCategory?.category_description && (
          <p className="text-secondary text-sm mb-4 leading-relaxed">
            {currentCategory.category_description}
          </p>
        )}

        {/* 컨트롤 바 */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* 뷰 모드 토글 */}
          <div className="flex items-center gap-1 rounded-full bg-neutral-50 p-1">
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-full transition-all ${
                viewMode === 'card' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-secondary hover:text-neutral-700 hover:bg-white'
              }`}
              aria-label="카드 뷰"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-all ${
                viewMode === 'list' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-secondary hover:text-neutral-700 hover:bg-white'
              }`}
              aria-label="리스트 뷰"
            >
              <List size={16} />
            </button>
          </div>

          {/* 정렬 옵션 */}
          <div className="flex items-center gap-2">
            <div className="flex flex-wrap items-center gap-1 rounded-full bg-neutral-50 p-1">
              <button
                onClick={() => setSortBy('latest')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                  sortBy === 'latest'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-secondary hover:text-neutral-700 hover:bg-white'
                }`}
                aria-label="최신순 정렬"
              >
                <Clock size={13} />
                <span className="hidden sm:inline">최신순</span>
              </button>
              <button
                onClick={() => setSortBy('oldest')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                  sortBy === 'oldest'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-secondary hover:text-neutral-700 hover:bg-white'
                }`}
                aria-label="오래된순 정렬"
              >
                <AlarmClock size={13} />
                <span className="hidden sm:inline">오래된순</span>
              </button>
              <button
                onClick={() => setSortBy('name')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all ${
                  sortBy === 'name'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-secondary hover:text-neutral-700 hover:bg-white'
                }`}
                aria-label="이름순 정렬"
              >
                <ArrowDownAZ size={13} />
                <span className="hidden sm:inline">이름순</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 북마크 목록  */}
      <BookmarkGridView
        bookmarks={bookmarks}
        viewMode={viewMode}
        isOwner={isOwner}
        onBookmarkClick={handleBookmarkClick}
        onBookmarkEdit={isOwner ? handleEditBookmark : undefined}
        onBookmarkDelete={isOwner ? handleDeleteBookmark : undefined}
        emptyMessage={
          isOwner 
            ? '이 카테고리에 첫 번째 북마크를 추가해보세요!'
            : '이 카테고리에 아직 북마크가 없습니다.'
        }
        emptyActionButton={
          isOwner ? (
            <button
              onClick={handleAddBookmark}
              className="mt-4 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-5 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-neutral-100 hover:border-neutral-300 hover:text-accent transition-colors"
            >
              <CirclePlus size={18} />
              북마크 추가하기
            </button>
          ) : undefined
        }
      />
      
      {bookmarks.length > 0 && (
        <>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPageFromAPI === 1}
                className="p-1.5 rounded-lg border border-neutral-200 text-secondary hover:bg-neutral-50 hover:border-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="이전 페이지"
              >
                <ChevronLeft size={14} />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-2.5 py-1 rounded-lg text-sm font-medium transition-all ${
                        currentPageFromAPI === pageNum
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-secondary hover:bg-neutral-100'
                      }`}
                      aria-label={`${pageNum}페이지로 이동`}
                      aria-current={currentPageFromAPI === pageNum ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPageFromAPI === totalPages}
                className="p-1.5 rounded-lg border border-neutral-200 text-secondary hover:bg-neutral-50 hover:border-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="다음 페이지"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </>
      )}
      
      {isOwner && (
        <button
          onClick={handleAddBookmark}
          className="sm:hidden fixed bottom-5 right-5 z-40 inline-flex items-center justify-center rounded-full bg-primary text-white shadow-lg h-14 w-14"
          aria-label="북마크 추가"
        >
          <CirclePlus size={22} />
        </button>
      )}
    </div>
  )
}
