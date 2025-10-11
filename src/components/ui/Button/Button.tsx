'use client'

import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import styles from './Button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode    // 왼쪽 아이콘
  rightIcon?: React.ReactNode   // 오른쪽 아이콘
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  children,
  ...props
}, ref) => {
  const isDisabled = disabled || isLoading

  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        isLoading && styles.loading,
        fullWidth && styles.fullWidth,
        className
      )}
      disabled={isDisabled}
      ref={ref}
      {...props}
    >
      {leftIcon && !isLoading && (
        <span className={styles.leftIcon}>{leftIcon}</span>
      )}
      
      {isLoading && (
        <span className={styles.loadingSpinner}>
          {/* 간단한 로딩 스피너 */}
          <svg className={styles.spinner} viewBox="0 0 24 24">
            <circle
              className={styles.spinnerCircle}
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="2"
            />
          </svg>
        </span>
      )}
      
      <span className={styles.buttonText}>
        {isLoading ? 'Loading..' : children}
      </span>
      
      {rightIcon && !isLoading && (
        <span className={styles.rightIcon}>{rightIcon}</span>
      )}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
