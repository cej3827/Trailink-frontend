import { useUserStore } from "../store/useUserStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface AddCategoryPayload {
    category_name: string;
    category_description: string | null;
}

export const addCategory = async (payload: AddCategoryPayload) => {
    try {
        // 사용자 토큰을 상태에서 가져옴
        const token = useUserStore.getState().token;
        if (!token) {
        console.warn('No token found. Please log in.');
        return; // 토큰 없으면 로그인
        }
        
        const response = await fetch(`${API_BASE_URL}/api/categories`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // 헤더에 토큰 포함
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error(`failed to add category: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch(error) {
        console.error('add category error:', error);
        throw error;
    }
}