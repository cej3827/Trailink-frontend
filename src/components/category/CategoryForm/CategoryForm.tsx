'use client'

import { useState, useEffect, useId } from 'react'
import { useCreateCategory } from '@/hooks/useCategories'
import { useUIStore } from '@/store/uiStore'
import Modal from '@/components/ui/Modal/Modal'
import Button from '@/components/ui/Button/Button'
import { CreateCategoryData } from '@/types'
import styles from './CategoryForm.module.scss'

export default function CategoryForm() {
  const { 
    categoryFormOpen, 
    closeCategoryForm, 
    editingCategory 
  } = useUIStore()
  
  const [formData, setFormData] = useState({
    category_name: '',
    category_description: '',
  })

  const nameId = useId()
  const descriptionId = useId()
  const maxNameLength = 50
  const nameLength = formData.category_name.length
  
  const createMutation = useCreateCategory()
  // const updateMutation = useUpdateCategory()
  
  const isEditing = Boolean(editingCategory)
  // const isLoading = createMutation.isPending || updateMutation.isPending
    const isLoading = createMutation.isPending

  // 초기 데이터 설정
  useEffect(() => {
    if (editingCategory) {
      setFormData({
        category_name: editingCategory.category_name || '',
        category_description: editingCategory.category_description || '',
      })
    } else {
      setFormData({
        category_name: '',
        category_description: '',
      })
    }
  }, [editingCategory])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.category_name.trim()) {
      alert('카테고리 이름을 입력해주세요.')
      return
    }

    try {
      if (isEditing && editingCategory) {
        // await updateMutation.mutateAsync({
        //   categoryId: editingCategory.category_id,
        //   data: formData
        // })
      } else {
        await createMutation.mutateAsync(formData as CreateCategoryData)
      }
      
      handleClose()
    } catch (error) {
      console.error('카테고리 저장 실패:', error)
    }
  }

  const handleClose = () => {
    setFormData({
      category_name: '',
      category_description: '',
    })
    closeCategoryForm()
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Modal
      isOpen={categoryFormOpen}
      onClose={handleClose}
      title={isEditing ? '카테고리 수정' : '새 카테고리'}
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit} className={`${styles.form} flex flex-col`}>
        {/* 카테고리 이름 */}
        <div className={`${styles.field} flex flex-col`}>
          <div className={`${styles.labelRow} flex items-center`}>
            <label className={styles.label} htmlFor={nameId}>카테고리 이름</label>
            <span className={styles.requiredBadge}>필수</span>
            <span className={`${styles.counter} ml-auto`}>{nameLength}/{maxNameLength}</span>
          </div>
          <input
            id={nameId}
            type="text"
            value={formData.category_name}
            onChange={(e) => handleInputChange('category_name', e.target.value)}
            placeholder="카테고리 이름"
            className={styles.input}
            required
            maxLength={maxNameLength}
            autoFocus
          />
          <p className={styles.helpText}>최대 50자까지 입력할 수 있어요.</p>
        </div>

        {/* 설명 */}
        <div className={`${styles.field} flex flex-col`}>
          <div className={`${styles.labelRow} flex items-center`}>
            <label className={styles.label} htmlFor={descriptionId}>설명</label>
            <span className={styles.optionalBadge}>선택</span>
          </div>
          <textarea
            id={descriptionId}
            value={formData.category_description}
            onChange={(e) => handleInputChange('category_description', e.target.value)}
            placeholder="카테고리에 대한 설명"
            className={styles.textarea}
            rows={3}
          />
        </div>

        {/* 버튼들 */}
        <div className={`${styles.actions} flex justify-end`}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
          >
            {isEditing ? '수정' : '생성'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
