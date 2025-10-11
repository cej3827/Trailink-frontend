'use server'

import { API_BASE_URL, getHeaders } from './index'
import { cookies } from 'next/headers'
import { CreateCategoryData, UpdateCategoryData } from '@/types'

// 카테고리 목록 조회
export async function getCategories() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    throw new Error('UNAUTHORIZED')
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/categories`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch {
        errorData = { message: '서버 응답 오류' }
      }

      console.log('카테고리 조회 에러:', errorData)

      // 토큰 관련 에러 처리
      switch (errorData.error) {
        case 'TOKEN_EXPIRED':
          cookieStore.delete('auth-token')
          throw new Error('TOKEN_EXPIRED')
          
        case 'INVALID_TOKEN':
          cookieStore.delete('auth-token')
          throw new Error('INVALID_TOKEN')
          
        default:
          if (response.status === 401) {
            cookieStore.delete('auth-token')
            throw new Error('UNAUTHORIZED')
          }
          throw new Error(errorData.message || '카테고리 조회 실패')
      }
    }
    const data = await response.json()
    console.log('카테고리 데이터:', data)

    return data.categories
  } catch (error) {
    console.error('getCategories 에러:', error)
    throw error
  }
}

// 카테고리 생성
export async function createCategory(payload: CreateCategoryData) {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) {
    throw new Error('UNAUTHORIZED')
  } 

  try {
    const response = await fetch(`${API_BASE_URL}/api/categories`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  
    if (!response.ok) {
      const errorData = await response.json()

      if (errorData.error === 'TOKEN_EXPIRED') {
        cookieStore.delete('auth-token')
        throw new Error('TOKEN_EXPIRED')
      }
      throw new Error(errorData.message || '카테고리 생성 실패')
    }

    const data = await response.json();
    console.log('서버에서 받은 데이터:', data)
    return data;
    
  } catch (error) {
    console.error('create bookmark error: ', error);
    throw error;
  }
}

// 카테고리 수정
export async function updateCategory(id: string, data: UpdateCategoryData) {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    throw new Error('카테고리 수정 실패')
  }
  
  return response.json()
}

// 카테고리 삭제
export async function deleteCategory(id: string) {
  const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  
  if (!response.ok) {
    throw new Error('카테고리 삭제 실패')
  }
}
