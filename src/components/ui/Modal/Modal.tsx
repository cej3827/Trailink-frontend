'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Button from '../Button/Button'
import styles from './Madal.module.scss'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
  showCloseButton?: boolean
}

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = 'md',
  showCloseButton = true 
}: ModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden' // 배경 스크롤 방지
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const modalContent = (
    <div className={`${styles.overlay} fixed inset-0 flex items-center justify-center`} onClick={onClose}>
        <div 
            className={`${styles.modal} ${styles[maxWidth]} w-full flex flex-col overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
        >

        {(title || showCloseButton) && (
          <div className={`${styles.header} flex items-center justify-between`}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className={styles.closeButton}
                aria-label="모달 닫기"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            )}
          </div>
        )}
        
        <div className={`${styles.content} flex-1 overflow-y-auto`}>
          {children}
        </div>
      </div>
    </div>
  )

  // 포털로 body에 렌더링
  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null
}
