// 북마크 생성/수정 폼
'use client'

import { useState, useEffect, useId } from 'react'
import { useCreateBookmark } from '@/hooks/useBookmarks'
import { useCategories } from '@/hooks/useCategories'
import { useUIStore } from '@/store/uiStore'
import Drawer from '@/components/ui/Drawer/Drawer'
import Button from '@/components/ui/Button/Button'
import { CreateBookmarkData } from '@/types'
import { isValidUrl } from '@/lib/utils'
import styles from './BookmarkForm.module.scss'

export default function BookmarkForm() {
  const { 
    bookmarkFormOpen, 
    closeBookmarkForm, 
    editingBookmark, 
    selectedCategoryId,
    openCategoryModal
  } = useUIStore()
  const { data: categories } = useCategories()
  
  const [formData, setFormData] = useState({
    bookmark_title: '',
    bookmark_url: '',
    bookmark_description: '',
    category_id: ''
  })
  
  const createMutation = useCreateBookmark()
  // const updateMutation = useUpdateBookmark()
  
  const isEditing = Boolean(editingBookmark)
  const isLoading = createMutation.isPending
  const urlId = useId()
  const titleId = useId()
  const categoryId = useId()
  const descriptionId = useId()

  // 초기 데이터 설정
  useEffect(() => {
    if (editingBookmark) {
      // 수정 모드
      setFormData({
        bookmark_title: editingBookmark.bookmark_title || '',
        bookmark_url: editingBookmark.bookmark_url || '',
        bookmark_description: editingBookmark.bookmark_description || '',
        category_id: editingBookmark.category_id || ''
      })
    } else if (selectedCategoryId) {
      // 새로 만들기 - 카테고리 지정됨
      setFormData({
        bookmark_title: '',
        bookmark_url: '',
        bookmark_description: '',
        category_id: selectedCategoryId
      })
    } else if (categories && categories.length > 0) {
      // 새로 만들기 - 기본 카테고리
      setFormData({
        bookmark_title: '',
        bookmark_url: '',
        bookmark_description: '',
        category_id: categories[0].category_id.toString()
      })
    }
  }, [editingBookmark, selectedCategoryId, categories])

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
      if (isEditing && editingBookmark) {
        // await updateMutation.mutateAsync({
        //   id: editingBookmark.bookmark_id,
        //   data: formData
        // })
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
    <Drawer
      isOpen={bookmarkFormOpen}
      onClose={handleClose}
      title={isEditing ? '북마크 수정' : '새 북마크'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className={`${styles.form} flex flex-col`}>
        {/* URL 입력 */}
        <div className={`${styles.field} flex flex-col`}>
          <div className={`${styles.labelRow} flex items-center`}>
            <label className={styles.label} htmlFor={urlId}>URL</label>
            <span className={styles.requiredBadge}>필수</span>
          </div>
          <input
            id={urlId}
            type="url"
            value={formData.bookmark_url}
            onChange={(e) => handleInputChange('bookmark_url', e.target.value)}
            placeholder="https://example.com"
            className={styles.input}
            required
            autoFocus
          />
          <p className={styles.helpText}>주소를 붙여넣으세요.</p>
        </div>

        {/* 제목 입력 */}
        <div className={`${styles.field} flex flex-col`}>
          <div className={`${styles.labelRow} flex items-center`}>
            <label className={styles.label} htmlFor={titleId}>제목</label>
            <span className={styles.requiredBadge}>필수</span>
          </div>
          <input
            id={titleId}
            type="text"
            value={formData.bookmark_title}
            onChange={(e) => handleInputChange('bookmark_title', e.target.value)}
            placeholder="북마크 제목"
            className={styles.input}
            required
          />
          <p className={styles.helpText}>링크를 다시 찾기 쉽도록 핵심만 적어주세요.</p>
        </div>

        {/* 카테고리 선택 */}
        <div className={`${styles.field} flex flex-col`}>
          <div className={`${styles.labelRow} flex items-center`}>
            <label className={styles.label} htmlFor={categoryId}>카테고리</label>
            <span className={styles.requiredBadge}>필수</span>
          </div>
          <div className={`${styles.controlRow} grid grid-cols-[1fr_auto] items-center`}>
            <select
              id={categoryId}
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
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={styles.inlineAction}
              onClick={() => openCategoryModal('create')}
            >
              새 카테고리
            </Button>
          </div>
          <p className={styles.helpText}>필요한 분류가 없으면 바로 새로 만들 수 있어요.</p>
        </div>

        {/* 설명 */}
        <div className={`${styles.field} flex flex-col`}>
          <div className={`${styles.labelRow} flex items-center`}>
            <label className={styles.label} htmlFor={descriptionId}>설명</label>
            <span className={styles.optionalBadge}>선택</span>
          </div>
          <textarea
            id={descriptionId}
            value={formData.bookmark_description}
            onChange={(e) => handleInputChange('bookmark_description', e.target.value)}
            placeholder="북마크에 대한 간단한 설명"
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
    </Drawer>
  )
}
