// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// interface AddBookmarkPayload {
//     category_id: number | null;
//     bookmark_title: string;
//     bookmark_url: string;
//     bookmark_description: string | null;
// }

// export const addBookmark = async (payload: AddBookmarkPayload) => {
//     try {
//         const response = await fetch(`${API_BASE_URL}/api/bookmarks`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload),
//         });

//         if (!response.ok) {
//             throw new Error(`failed to add bookmark: ${response.status}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('add bookmark error:', error);
//         throw error;
//     }
// };

import { API_BASE_URL, getHeaders } from './index'
import { Bookmark, CreateBookmarkData, UpdateBookmarkData } from '@/types'

// 북마크 목록 조회
export async function getBookmarks(params?: {
  categoryId?: string
  search?: string
  page?: number
  limit?: number
}) {
  const searchParams = new URLSearchParams()
  if (params?.categoryId) searchParams.set('categoryId', params.categoryId)
  if (params?.search) searchParams.set('search', params.search)
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.limit) searchParams.set('limit', params.limit.toString())

  const query = searchParams.toString()
  const url = `${API_BASE_URL}/bookmarks${query ? `?${query}` : ''}`
  
  const response = await fetch(url, {
    headers: getHeaders(),
  })
  
  if (!response.ok) {
    throw new Error('북마크 조회 실패')
  }
  
  return response.json()
}

// 최근 북마크 조회
export async function getRecentBookmarks(limit = 8) {
  const response = await fetch(`${API_BASE_URL}/bookmarks/recent?limit=${limit}`, {
    headers: getHeaders(),
  })
  
  if (!response.ok) {
    throw new Error('최근 북마크 조회 실패')
  }
  
  return response.json()
}

// 북마크 생성
export async function createBookmark(data: CreateBookmarkData) {
  const response = await fetch(`${API_BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    throw new Error('북마크 생성 실패')
  }
  
  return response.json()
}

// 북마크 수정
export async function updateBookmark(id: string, data: UpdateBookmarkData) {
  const response = await fetch(`${API_BASE_URL}/bookmarks/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    throw new Error('북마크 수정 실패')
  }
  
  return response.json()
}

// 북마크 삭제
export async function deleteBookmark(id: string) {
  const response = await fetch(`${API_BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  
  if (!response.ok) {
    throw new Error('북마크 삭제 실패')
  }
}
