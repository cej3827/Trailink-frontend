'use client'

import { useState, useEffect } from 'react'
import { useCreateCategory, useUpdateCategory } from '@/hooks/useCategories'
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
  
  const createMutation = useCreateCategory()
  const updateMutation = useUpdateCategory()
  
  const isEditing = Boolean(editingCategory)
  const isLoading = createMutation.isPending || updateMutation.isPending

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
        await updateMutation.mutateAsync({
          categoryId: editingCategory.category_id,
          data: formData
        })
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
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 카테고리 이름 */}
        <div className={styles.field}>
          <label className={styles.label}>카테고리 이름 *</label>
          <input
            type="text"
            value={formData.category_name}
            onChange={(e) => handleInputChange('category_name', e.target.value)}
            placeholder="카테고리 이름"
            className={styles.input}
            required
            maxLength={50}
          />
        </div>

        {/* 설명 */}
        <div className={styles.field}>
          <label className={styles.label}>설명</label>
          <textarea
            value={formData.category_description}
            onChange={(e) => handleInputChange('category_description', e.target.value)}
            placeholder="카테고리에 대한 설명"
            className={styles.textarea}
            rows={3}
          />
        </div>

        {/* 버튼들 */}
        <div className={styles.actions}>
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
