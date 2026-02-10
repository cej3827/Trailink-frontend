'use client'

import { useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import Button from '@/components/ui/Button/Button'
import styles from './Drawer.module.scss'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  showCloseButton?: boolean
  className?: string
  overlayClassName?: string
  panelClassName?: string
  headerClassName?: string
  titleClassName?: string
  closeButtonClassName?: string
  contentClassName?: string
}

function getFocusable(container: HTMLElement) {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ]
  return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(',')))
}

export default function Drawer({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  className = '',
  overlayClassName = '',
  panelClassName = '',
  headerClassName = '',
  titleClassName = '',
  closeButtonClassName = '',
  contentClassName = '',
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const lastActiveRef = useRef<HTMLElement | null>(null)

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (!isOpen) return

    lastActiveRef.current = document.activeElement as HTMLElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const t = window.setTimeout(() => {
      const panel = panelRef.current
      if (!panel) return
      const focusables = getFocusable(panel)
      ;(focusables[0] ?? panel).focus()
    }, prefersReducedMotion ? 0 : 20)

    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = prevOverflow
      lastActiveRef.current?.focus?.()
    }
  }, [isOpen, prefersReducedMotion])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()

      if (e.key === 'Tab') {
        const panel = panelRef.current
        if (!panel) return

        const focusables = getFocusable(panel)
        if (focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        const active = document.activeElement as HTMLElement

        if (e.shiftKey) {
          if (active === first || !panel.contains(active)) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (active === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const drawerContent = (
    <div className={`${styles.root} fixed inset-0 pointer-events-auto ${className}`}>
      <div
        className={`${styles.overlay} absolute inset-0 ${prefersReducedMotion ? styles.overlayStatic : ''} ${overlayClassName}`}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Drawer'}
        tabIndex={-1}
        className={`${styles.panel} absolute right-0 top-0 h-full w-full flex flex-col outline-none ${styles[size]} ${prefersReducedMotion ? styles.panelStatic : ''} ${panelClassName}`}
      >
        {(title || showCloseButton) && (
          <div className={`${styles.header} ${headerClassName}`}>
            {title && <h2 className={`${styles.title} ${titleClassName}`}>{title}</h2>}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className={`${styles.closeButton} ${closeButtonClassName}`}
                aria-label="닫기"
              >
                닫기
              </Button>
            )}
          </div>
        )}

        <div className={`${styles.content} ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  )

  return typeof document !== 'undefined'
    ? createPortal(drawerContent, document.body)
    : null
}
