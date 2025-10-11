// 북마크 생성/수정 폼
'use client'

import { useState, useEffect } from 'react'
import { useCreateBookmark, useUpdateBookmark } from '@/hooks/useBookmarks'
import { useCategories } from '@/hooks/useCategories'
import { useUIStore } from '@/store/uiStore'
import Modal from '@/components/ui/Modal/Modal'
import Button from '@/components/ui/Button/Button'
import { Bookmark, CreateBookmarkData } from '@/types'
import { isValidUrl } from '@/lib/utils'
import styles from './BookmarkForm.module.scss'

interface BookmarkFormProps {
  bookmark?: Bookmark // 수정 시 전달
}

export default function BookmarkForm({ bookmark }: BookmarkFormProps) {
  const { bookmarkFormOpen, closeBookmarkForm } = useUIStore()
  const { data: categories } = useCategories()
  
  const [formData, setFormData] = useState({
    bookmark_title: '',
    bookmark_url: '',
    bookmark_description: '',
    category_id: ''
  })
  
  const createMutation = useCreateBookmark()
  const updateMutation = useUpdateBookmark()
  
  const isEditing = Boolean(bookmark)
  const isLoading = createMutation.isPending

  // 수정 시 초기 데이터 설정
  useEffect(() => {
    if (bookmark) {
      setFormData({
        bookmark_title: bookmark.title,
        bookmark_url: bookmark.url,
        bookmark_description: bookmark.description || '',
        category_id: bookmark.categoryId
      })
    } else {
      // 새로 만들 때 기본 카테고리 선택
      if (categories && categories.length > 0) {
        setFormData(prev => ({ ...prev, categoryId: categories[0].id }))
      }
    }
  }, [bookmark, categories])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.bookmark_title || !formData.bookmark_url || !formData.category_id) {
      alert('제목, URL, 카테고리는 필수입니다.')
      return
    }

    if (!isValidUrl(formData.bookmark_url)) {
      alert('올바른 URL을 입력해주세요.')
      return
    }

    try {
      if (isEditing && bookmark) {
        await updateMutation.mutateAsync({
          id: bookmark.id,
          data: formData
        })
      } else {
        await createMutation.mutateAsync(formData as unknown as CreateBookmarkData)
      }
      
      handleClose()
    } catch (error) {
      console.error('북마크 저장 실패:', error)
    }
  }

  const handleClose = () => {
    setFormData({
      bookmark_title: '',
      bookmark_url: '',
      bookmark_description: '',
      category_id: ''
    })
    closeBookmarkForm()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Modal
      isOpen={bookmarkFormOpen}
      onClose={handleClose}
      title={isEditing ? '북마크 수정' : '새 북마크'}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* URL 입력 */}
        <div className={styles.field}>
          <label className={styles.label}>URL *</label>
          <input
            type="url"
            value={formData.bookmark_url}
            onChange={(e) => handleInputChange('bookmark_url', e.target.value)}
            placeholder="https://example.com"
            className={styles.input}
            required
          />
        </div>

        {/* 제목 입력 */}
        <div className={styles.field}>
          <label className={styles.label}>제목 *</label>
          <input
            type="text"
            value={formData.bookmark_title}
            onChange={(e) => handleInputChange('bookmark_title', e.target.value)}
            placeholder="북마크 제목"
            className={styles.input}
            required
          />
        </div>

        {/* 카테고리 선택 */}
        <div className={styles.field}>
          <label className={styles.label}>카테고리 *</label>
          <select
            value={formData.category_id}
            onChange={(e) => handleInputChange('category_id', e.target.value)}
            className={styles.select}
            required
          >
            <option value="">카테고리 선택</option>
            {categories?.map((category: { category_id: number; category_name: string; }) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* 설명 */}
        <div className={styles.field}>
          <label className={styles.label}>설명</label>
          <textarea
            value={formData.bookmark_description}
            onChange={(e) => handleInputChange('bookmark_description', e.target.value)}
            placeholder="북마크에 대한 간단한 설명"
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
            size='lg'
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            size='lg'
          >
            {isEditing ? '수정' : '저장'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
