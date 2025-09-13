// // 북마크 리스트, react-query 사용

// import BookmarkCard from '@/components/bookmark/BookmarkCard/BookmarkCard'
// import { Bookmark } from '@/types'
// import styles from './BookmarkGrid.module.scss'

// interface BookmarkGridProps {
//   bookmarks: Bookmark[]
//   viewMode?: 'grid' | 'list'
//   readonly?: boolean // 읽기 전용 모드
// }

// export default function BookmarkGrid({ 
//   bookmarks, 
//   viewMode = 'grid',
//   readonly = false 
// }: BookmarkGridProps) {
//   if (bookmarks.length === 0) {
//     return (
//       <div className={styles.empty}>
//         <p>북마크가 없습니다.</p>
//         {!readonly && (
//           <p>첫 번째 북마크를 추가해보세요!</p>
//         )}
//       </div>
//     )
//   }

//   return (
//     <div className={`${styles.grid} ${styles[viewMode]}`}>
//       {bookmarks.map((bookmark) => (
//         <BookmarkCard 
//           key={bookmark.id} 
//           bookmark={bookmark}
//           readonly={readonly} // 읽기 전용 모드 전달
//         />
//       ))}
//     </div>
//   )
// }
