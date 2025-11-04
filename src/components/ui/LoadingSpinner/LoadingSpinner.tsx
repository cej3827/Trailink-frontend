'use client'

import styles from './LoadingSpinner.module.scss'

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'gray' | 'white' | 'current'
  className?: string
  text?: string
  fullScreen?: boolean
}

export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  className = '',
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {

  const containerClassNames = [
    styles.spinnerContainer,
    fullScreen && styles.fullScreen,
    className
  ].filter(Boolean).join(' ')

  const spinnerClassNames = [
    styles.spinner,
    styles[size],
    styles[color]
  ].filter(Boolean).join(' ')


  const spinnerContent = (
    <div className={containerClassNames}>
      <div className={spinnerClassNames}>
        <div className={styles.spinnerBorder}></div>
      </div>
      {text && (
        <span className={styles.spinnerText}>
          {text}
        </span>
      )}
      <span className="sr-only">로딩 중...</span>
    </div>
  )

  return spinnerContent
}

// 페이지 전체를 덮는 로딩 스피너
export function FullScreenSpinner({ text = "로딩 중..." }: { text?: string }) {
  return (
    <LoadingSpinner
      fullScreen
      size="lg"
      text={text}
      className={styles.overlay}
    />
  )
}

// 버튼 내부용 작은 스피너
export function ButtonSpinner({ size = 'sm' }: { size?: 'xs' | 'sm' }) {
  return (
    <LoadingSpinner
      size={size}
      color="current"
      className={styles.buttonSpinner}
    />
  )
}
