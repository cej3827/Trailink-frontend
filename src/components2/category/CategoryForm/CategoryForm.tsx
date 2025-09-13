// // src/components/category/CategoryForm/CategoryForm.tsx
// 'use client'

// import { useState, useEffect } from 'react'
// import { useCreateCategory, useUpdateCategory } from '@/hooks/useCategories'
// import { useUIStore } from '@/store/uiStore'
// import { useCategoryUIStore } from '@/store/categoryUIStore'
// import Modal from '@/components/ui/Modal/Modal'
// import Button from '@/components/ui/Button/Button'
// import { Category, CreateCategoryData } from '@/types'
// import { CATEGORY_COLORS } from '@/lib/constants'
// import styles from './CategoryForm.module.scss'

// interface CategoryFormProps {
//   category?: Category // 수정 시 전달
// }

// export default function CategoryForm({ category }: CategoryFormProps) {
//   const { categoryFormOpen, closeCategoryForm } = useUIStore()
//   const { editingCategoryId, setEditingCategory } = useCategoryUIStore()
  
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     color: CATEGORY_COLORS[0],
//     isPublic: false
//   })
  
//   const createMutation = useCreateCategory()
//   const updateMutation = useUpdateCategory()
  
//   const isEditing = Boolean(category)
//   const isLoading = createMutation.isPending || updateMutation.isPending

//   // 수정 시 초기 데이터 설정
//   useEffect(() => {
//     if (category) {
//       setFormData({
//         name: category.name,
//         description: category.description || '',
//         color: category.color || CATEGORY_COLORS[0],
//         isPublic: category.isPublic
//       })
//     }
//   }, [category])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     if (!formData.name.trim()) {
//       alert('카테고리 이름을 입력해주세요.')
//       return
//     }

//     try {
//       if (isEditing && category) {
//         await updateMutation.mutateAsync({
//           id: category.id,
//           data: formData
//         })
//         setEditingCategory(null)
//       } else {
//         await createMutation.mutateAsync(formData as CreateCategoryData)
//       }
      
//       handleClose()
//     } catch (error) {
//       console.error('카테고리 저장 실패:', error)
//     }
//   }

//   const handleClose = () => {
//     setFormData({
//       name: '',
//       description: '',
//       color: CATEGORY_COLORS[0],
//       isPublic: false
//     })
//     closeCategoryForm()
//     setEditingCategory(null)
//   }

//   const handleInputChange = (field: string, value: string | boolean) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//   }

//   return (
//     <Modal
//       isOpen={categoryFormOpen}
//       onClose={handleClose}
//       title={isEditing ? '카테고리 수정' : '새 카테고리'}
//       maxWidth="sm"
//     >
//       <form onSubmit={handleSubmit} className={styles.form}>
//         {/* 카테고리 이름 */}
//         <div className={styles.field}>
//           <label className={styles.label}>이름 *</label>
//           <input
//             type="text"
//             value={formData.name}
//             onChange={(e) => handleInputChange('name', e.target.value)}
//             placeholder="카테고리 이름"
//             className={styles.input}
//             required
//             maxLength={50}
//           />
//         </div>

//         {/* 설명 */}
//         <div className={styles.field}>
//           <label className={styles.label}>설명</label>
//           <textarea
//             value={formData.description}
//             onChange={(e) => handleInputChange('description', e.target.value)}
//             placeholder="카테고리에 대한 설명"
//             className={styles.textarea}
//             rows={3}
//             maxLength={200}
//           />
//         </div>

//         {/* 색상 선택 */}
//         <div className={styles.field}>
//           <label className={styles.label}>색상</label>
//           <div className={styles.colorGrid}>
//             {CATEGORY_COLORS.map((color) => (
//               <button
//                 key={color}
//                 type="button"
//                 className={`${styles.colorOption} ${formData.color === color ? styles.selected : ''}`}
//                 style={{ backgroundColor: color }}
//                 onClick={() => handleInputChange('color', color)}
//                 aria-label={`색상 ${color} 선택`}
//               >
//                 {formData.color === color && (
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                   </svg>
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* 공개 설정 */}
//         <div className={styles.field}>
//           <label className={styles.checkboxLabel}>
//             <input
//               type="checkbox"
//               checked={formData.isPublic}
//               onChange={(e) => handleInputChange('isPublic', e.target.checked)}
//               className={styles.checkbox}
//             />
//             <span className={styles.checkboxText}>
//               공개 카테고리로 설정
//               <small className={styles.helpText}>
//                 다른 사용자들이 이 카테고리의 북마크를 볼 수 있습니다
//               </small>
//             </span>
//           </label>
//         </div>

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
//             {isEditing ? '수정' : '생성'}
//           </Button>
//         </div>
//       </form>
//     </Modal>
//   )
// }
