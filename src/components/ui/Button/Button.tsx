'use client'

import { forwardRef, ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'
import { ButtonSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner'

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
  
  const classNameList = [
    styles.button,
    styles[variant],
    styles[size],
    isLoading && styles.loading,
    fullWidth && styles.fullWidth,
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classNameList}
      disabled={isDisabled}
      ref={ref}
      {...props}
    >
      {leftIcon && !isLoading && (
        <span className={`${styles.leftIcon} flex items-center justify-center shrink-0`}>{leftIcon}</span>
      )}
      
      {isLoading && (
        <span className={`${styles.loadingSpinner} flex items-center justify-center`}>
          <ButtonSpinner size="sm" />
        </span>
      )}
      
      <span className={`${styles.buttonText} flex items-center`}>
        {children}
      </span>
      
      {rightIcon && !isLoading && (
        <span className={`${styles.rightIcon} flex items-center justify-center shrink-0`}>{rightIcon}</span>
      )}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
