// 검색바 (클라이언트)
'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import styles from './SearchBar.module.scss'

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export default function SearchBar({
  placeholder = "북마크 검색...",
  value: controlledValue,
  onChange,
  onSearch,
  size = 'md',
  disabled = false,
  className = ''
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('')
  
  // 외부에서 value를 제어하는 경우와 내부에서 관리하는 경우 모두 지원
  const value = controlledValue !== undefined ? controlledValue : internalValue
  const setValue = controlledValue !== undefined ? onChange || (() => {}) : setInternalValue

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setValue(newValue)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && value.trim()) {
      onSearch(value.trim())
    }
  }

  const handleClear = () => {
    setValue('')
    if (onSearch) {
      onSearch('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    }
    if (e.key === 'Escape') {
      handleClear()
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className={`${styles.searchForm} ${styles[size]} ${className}`}
    >
      <div className={`${styles.searchContainer} ${disabled ? styles.disabled : ''}`}>
        <Search 
          className={styles.searchIcon} 
          size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} 
        />
        
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={styles.searchInput}
          aria-label="검색"
        />
        
        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="검색어 지우기"
          >
            <X size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />
          </button>
        )}
      </div>
    </form>
  )
}
