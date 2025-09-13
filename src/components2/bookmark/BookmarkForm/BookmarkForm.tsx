// // 북마크 생성/수정 폼

// // src/components/bookmark/BookmarkForm/BookmarkForm.tsx
// 'use client'

// import { useState, useEffect } from 'react'
// import { useCreateBookmark, useUpdateBookmark } from '@/hooks/useBookmarks'
// import { useCategories } from '@/hooks/useCategories'
// import { useUrlPreview } from '@/hooks/usePreview'
// import { useUIStore } from '@/store/uiStore'
// import Modal from '@/components/ui/Modal/Modal'
// import Button from '@/components/ui/Button/Button'
// import { Bookmark, CreateBookmarkData } from '@/types'
// import { isValidUrl, debounce } from '@/lib/utils'
// import styles from './BookmarkForm.module.scss'

// interface BookmarkFormProps {
//   bookmark?: Bookmark // 수정 시 전달
// }

// export default function BookmarkForm({ bookmark }: BookmarkFormProps) {
//   const { bookmarkFormOpen, closeBookmarkForm } = useUIStore()
//   const { data: categories } = useCategories()
  
//   const [formData, setFormData] = useState({
//     title: '',
//     url: '',
//     description: '',
//     notes: '',
//     categoryId: ''
//   })
  
//   const [urlForPreview, setUrlForPreview] = useState('')
  
//   // URL 미리보기 (디바운스 적용)
//   const { data: preview, isLoading: previewLoading } = useUrlPreview(urlForPreview)
  
//   const createMutation = useCreateBookmark()
//   const updateMutation = useUpdateBookmark()
  
//   const isEditing = Boolean(bookmark)
//   const isLoading = createMutation.isPending || updateMutation.isPending

//   // 수정 시 초기 데이터 설정
//   useEffect(() => {
//     if (bookmark) {
//       setFormData({
//         title: bookmark.title,
//         url: bookmark.url,
//         description: bookmark.description || '',
//         notes: bookmark.notes || '',
//         categoryId: bookmark.categoryId
//       })
//     } else {
//       // 새로 만들 때 기본 카테고리 선택
//       if (categories && categories.length > 0) {
//         setFormData(prev => ({ ...prev, categoryId: categories[0].id }))
//       }
//     }
//   }, [bookmark, categories])

//   // URL 변경 시 미리보기 가져오기 (디바운스)
//   const debouncedPreview = debounce((url: string) => {
//     if (isValidUrl(url)) {
//       setUrlForPreview(url)
//     }
//   }, 500)

//   useEffect(() => {
//     debouncedPreview(formData.url)
//   }, [formData.url])

//   // 미리보기 데이터를 폼에 자동 적용
//   useEffect(() => {
//     if (preview && !formData.title) {
//       setFormData(prev => ({
//         ...prev,
//         title: preview.title || '',
//         description: preview.description || ''
//       }))
//     }
//   }, [preview, formData.title])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     if (!formData.title || !formData.url || !formData.categoryId) {
//       alert('제목, URL, 카테고리는 필수입니다.')
//       return
//     }

//     if (!isValidUrl(formData.url)) {
//       alert('올바른 URL을 입력해주세요.')
//       return
//     }

//     try {
//       if (isEditing && bookmark) {
//         await updateMutation.mutateAsync({
//           id: bookmark.id,
//           data: formData
//         })
//       } else {
//         await createMutation.mutateAsync(formData as CreateBookmarkData)
//       }
      
//       handleClose()
//     } catch (error) {
//       console.error('북마크 저장 실패:', error)
//     }
//   }

//   const handleClose = () => {
//     setFormData({
//       title: '',
//       url: '',
//       description: '',
//       notes: '',
//       categoryId: ''
//     })
//     setUrlForPreview('')
//     closeBookmarkForm()
//   }

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//   }

//   return (
//     <Modal
//       isOpen={bookmarkFormOpen}
//       onClose={handleClose}
//       title={isEditing ? '북마크 수정' : '새 북마크'}
//       maxWidth="md"
//     >
//       <form onSubmit={handleSubmit} className={styles.form}>
//         {/* URL 입력 */}
//         <div className={styles.field}>
//           <label className={styles.label}>URL *</label>
//           <input
//             type="url"
//             value={formData.url}
//             onChange={(e) => handleInputChange('url', e.target.value)}
//             placeholder="https://example.com"
//             className={styles.input}
//             required
//           />
//           {previewLoading && (
//             <div className={styles.previewLoading}>URL 정보를 가져오는 중...</div>
//           )}
//         </div>

//         {/* 제목 입력 */}
//         <div className={styles.field}>
//           <label className={styles.label}>제목 *</label>
//           <input
//             type="text"
//             value={formData.title}
//             onChange={(e) => handleInputChange('title', e.target.value)}
//             placeholder="북마크 제목"
//             className={styles.input}
//             required
//           />
//         </div>

//         {/* 카테고리 선택 */}
//         <div className={styles.field}>
//           <label className={styles.label}>카테고리 *</label>
//           <select
//             value={formData.categoryId}
//             onChange={(e) => handleInputChange('categoryId', e.target.value)}
//             className={styles.select}
//             required
//           >
//             <option value="">카테고리 선택</option>
//             {categories?.map((category) => (
//               <option key={category.id} value={category.id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* 설명 */}
//         <div className={styles.field}>
//           <label className={styles.label}>설명</label>
//           <textarea
//             value={formData.description}
//             onChange={(e) => handleInputChange('description', e.target.value)}
//             placeholder="북마크에 대한 간단한 설명"
//             className={styles.textarea}
//             rows={3}
//           />
//         </div>

//         {/* 메모 */}
//         <div className={styles.field}>
//           <label className={styles.label}>개인 메모</label>
//           <textarea
//             value={formData.notes}
//             onChange={(e) => handleInputChange('notes', e.target.value)}
//             placeholder="개인적인 메모나 태그"
//             className={styles.textarea}
//             rows={4}
//           />
//         </div>

//         {/* 미리보기 */}
//         {preview && (
//           <div className={styles.preview}>
//             <h4 className={styles.previewTitle}>미리보기</h4>
//             <div className={styles.previewCard}>
//               {preview.image && (
//                 <img 
//                   src={preview.image} 
//                   alt="미리보기" 
//                   className={styles.previewImage}
//                 />
//               )}
//               <div className={styles.previewContent}>
//                 <h5>{preview.title}</h5>
//                 <p>{preview.description}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* 버튼들 */}
//         <div className={styles.actions}>
//           <Button
//             type="button"
//             variant="secondary"
//             onClick={handleClose}
//             disabled={isLoading}
//           >
//             취소
//           </Button>
//           <Button
//             type="submit"
//             variant="primary"
//             loading={isLoading}
//           >
//             {isEditing ? '수정' : '저장'}
//           </Button>
//         </div>
//       </form>
//     </Modal>
//   )
// }
