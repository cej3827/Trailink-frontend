// // 북마크 카드(미리보기/선택 등)

// // src/components/bookmark/BookmarkCard/BookmarkCard.tsx
// 'use client'

// import { useState } from 'react'
// import { useDeleteBookmark } from '@/hooks/useBookmarks'
// import { useBookmarkUIStore } from '@/store/bookmarkUIStore'
// import { Bookmark } from '@/types'
// import { formatRelativeTime, truncateText, getFaviconUrl } from '@/lib/utils'
// import Button from '@/components/ui/Button/Button'
// import { cn } from '@/lib/utils'
// import styles from './BookmarkCard.module.scss'

// interface BookmarkCardProps {
//   bookmark: Bookmark
// }

// export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const { selectedIds, toggleSelected, isSelected } = useBookmarkUIStore()
//   const deleteBookmarkMutation = useDeleteBookmark()
  
//   const selected = isSelected(bookmark.id)

//   const handleClick = (e: React.MouseEvent) => {
//     if (e.metaKey || e.ctrlKey) {
//       // Cmd/Ctrl 클릭 시 새 탭에서 열기
//       window.open(bookmark.url, '_blank')
//     } else {
//       // 일반 클릭 시 현재 탭에서 열기
//       window.open(bookmark.url, '_self')
//     }
//   }

//   const handleSelect = (e: React.MouseEvent) => {
//     e.stopPropagation()
//     toggleSelected(bookmark.id)
//   }

//   const handleDelete = async () => {
//     if (confirm('정말 이 북마크를 삭제하시겠습니까?')) {
//       deleteBookmarkMutation.mutate(bookmark.id)
//     }
//     setMenuOpen(false)
//   }

//   return (
//     <article className={cn(styles.card, selected && styles.selected)}>
//       {/* 선택 체크박스 */}
//       <div className={styles.selectArea}>
//         <input
//           type="checkbox"
//           checked={selected}
//           onChange={handleSelect}
//           className={styles.checkbox}
//           aria-label={`${bookmark.title} 선택`}
//         />
//       </div>

//       {/* 썸네일 */}
//       <div className={styles.thumbnail} onClick={handleClick}>
//         {bookmark.previewImage ? (
//           <img 
//             src={bookmark.previewImage} 
//             alt={bookmark.title}
//             className={styles.previewImage}
//           />
//         ) : (
//           <div className={styles.placeholderImage}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
//             </svg>
//           </div>
//         )}
//       </div>

//       {/* 콘텐츠 */}
//       <div className={styles.content} onClick={handleClick}>
//         <div className={styles.header}>
//           <img 
//             src={getFaviconUrl(bookmark.url)} 
//             alt="favicon"
//             className={styles.favicon}
//             onError={(e) => {
//               e.currentTarget.style.display = 'none'
//             }}
//           />
//           <h3 className={styles.title}>
//             {truncateText(bookmark.title, 50)}
//           </h3>
//         </div>

//         {bookmark.description && (
//           <p className={styles.description}>
//             {truncateText(bookmark.description, 100)}
//           </p>
//         )}

//         <div className={styles.footer}>
//           <span className={styles.domain}>
//             {new URL(bookmark.url).hostname}
//           </span>
//           <span className={styles.date}>
//             {formatRelativeTime(bookmark.createdAt)}
//           </span>
//         </div>
//       </div>

//       {/* 옵션 메뉴 */}
//       <div className={styles.menuArea}>
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={(e) => {
//             e.stopPropagation()
//             setMenuOpen(!menuOpen)
//           }}
//           className={styles.menuButton}
//           aria-label="옵션 메뉴"
//         >
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//             <circle cx="12" cy="12" r="1" />
//             <circle cx="19" cy="12" r="1" />
//             <circle cx="5" cy="12" r="1" />
//           </svg>
//         </Button>

//         {menuOpen && (
//           <div className={styles.dropdown}>
//             <button className={styles.menuItem}>
//               수정
//             </button>
//             <button 
//               className={cn(styles.menuItem, styles.delete)}
//               onClick={handleDelete}
//               disabled={deleteBookmarkMutation.isPending}
//             >
//               삭제
//             </button>
//           </div>
//         )}
//       </div>
//     </article>
//   )
// }








// // src/components/bookmark/BookmarkCard/BookmarkCard.tsx
// 'use client'

// import { useState } from 'react'
// import { useDeleteBookmark, useUpdateBookmark } from '@/hooks/useBookmarks'
// import ContextMenu from '@/components/ui/ContextMenu/ContextMenu'
// import { Bookmark } from '@/types'
// import styles from './BookmarkCard.module.scss'

// interface BookmarkCardProps {
//   bookmark: Bookmark
//   readonly?: boolean
// }

// export default function BookmarkCard({ bookmark, readonly = false }: BookmarkCardProps) {
//   const [showContextMenu, setShowContextMenu] = useState(false)
//   const deleteBookmark = useDeleteBookmark()
//   const updateBookmark = useUpdateBookmark()

//   const handleContextMenu = (e: React.MouseEvent) => {
//     if (readonly) return // 읽기 전용에서는 컨텍스트 메뉴 비활성화
    
//     e.preventDefault()
//     setShowContextMenu(true)
//   }

//   const contextMenuItems = readonly ? [] : [
//     {
//       label: '편집',
//       onClick: () => {/* 편집 로직 */}
//     },
//     {
//       label: '삭제',
//       onClick: () => deleteBookmark.mutate(bookmark.id),
//       dangerous: true
//     },
//     {
//       label: '공유',
//       onClick: () => {/* 공유 로직 */}
//     },
//     {
//       label: '이동',
//       onClick: () => {/* 이동 로직 */}
//     }
//   ]

//   return (
//     <div 
//       className={`${styles.card} ${readonly ? styles.readonly : ''}`}
//       onContextMenu={handleContextMenu}
//     >
//       <a 
//         href={bookmark.url} 
//         target="_blank" 
//         rel="noopener noreferrer"
//         className={styles.link}
//       >
//         <div className={styles.favicon}>
//           <img 
//             src={`https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=32`}
//             alt=""
//           />
//         </div>
        
//         <div className={styles.content}>
//           <h3 className={styles.title}>{bookmark.title}</h3>
//           <p className={styles.url}>{new URL(bookmark.url).hostname}</p>
//           {bookmark.description && (
//             <p className={styles.description}>{bookmark.description}</p>
//           )}
//         </div>
//       </a>

//       {!readonly && showContextMenu && (
//         <ContextMenu 
//           items={contextMenuItems}
//           onClose={() => setShowContextMenu(false)}
//         />
//       )}
//     </div>
//   )
// }
