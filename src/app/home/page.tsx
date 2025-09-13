// 로그인된 사용자 홈

import { API_BASE_URL } from "@/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomeClient from "@/components2/Home/Home";

async function getCurrentUserServer() {
    try {
        const cookieStore = cookies()
        const token = (await cookieStore).get('auth-token')?.value
        
        if (!token) return null

        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
            cache: 'no-store'
        })

        if (!response.ok) return null
        return response.json()
    } catch {
        return null
    }
}

export default async function HomePage() {
    const user = await getCurrentUserServer()

    if (!user) {
        redirect('/')
    }

    return <HomeClient initialUser={user} />;
}