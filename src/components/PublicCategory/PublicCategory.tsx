// 'use client'

// import { useState } from 'react'
// import PublicLayout from '@/components/layout/PublicLayout/PublicLayout'
// import BookmarkGrid from '@/components/bookmark/BookmarkGrid/BookmarkGrid'
// import SearchBar from '@/components/ui/SearchBar/SearchBar'
// import ViewToggle from '@/components/ui/ViewToggle/ViewToggle'
// import { Category, Bookmark } from '@/types'

// interface PublicCategoryClientProps {
//   category: Category
//   initialBookmarks: Bookmark[]
// }

// export default function PublicCategoryClient({ 
//   category, 
//   initialBookmarks 
// }: PublicCategoryClientProps) {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  
//   const filteredBookmarks = initialBookmarks.filter(bookmark =>
//     bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     bookmark.url.toLowerCase().includes(searchQuery.toLowerCase())
//   )

//   return (
//     <PublicLayout>
//       <div className="container">
//         <div className="category-header">
//           <div className="category-info">
//             <h1>{category.name}</h1>
//             {category.description && (
//               <p className="category-description">{category.description}</p>
//             )}
//           </div>
          
//           <div className="category-controls">
//             <SearchBar
//               value={searchQuery}
//               onChange={setSearchQuery}
//               placeholder="북마크 검색..."
//             />
//             <ViewToggle 
//               mode={viewMode} 
//               onChange={setViewMode}
//             />
//           </div>
//         </div>

//         <BookmarkGrid 
//           bookmarks={filteredBookmarks}
//           viewMode={viewMode}
//           readonly={true} // 읽기 전용 모드
//         />
//       </div>
//     </PublicLayout>
//   )
// }
