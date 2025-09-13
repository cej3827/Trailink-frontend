// // // 환경변수에 정의된 API의 기본 URL을 가져옴
// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// // //로그인 응답 인터페이스
// // interface LoginResponse {
// //   success: boolean; 
// //   message: string;
// //   token: string; //인증 토큰
// //   data: {
// //     user_id: string;
// //     user_name: string;
// //     profile_img: string;
// //   };
// // }

// // //사용자 정보 응답 인터페이스
// // interface UserResponse {
// //   user_id: string;
// //   user_name: string;
// //   user_profile_img: string;
// // }

// // //로그인 함수, 요청 성공시 LoginResponse 형식의 데이터를 반환
// // export const loginUser = async (userId: string, password: string): Promise<LoginResponse> => {
// //   try { 
// //     //서버에 로그인 요청
// //     const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
// //       method: "POST", 
// //       headers: {
// //         "Content-Type": "application/json", //json데이터 전송
// //       },
// //       body: JSON.stringify({ //로그인 요청시 ID와 비밀번호 보냄
// //         user_id: userId,
// //         user_password: password,
// //       }),
// //     });

// //     // 서버응답 성공 상태가 아닐 경우
// //     if (!response.ok) {
// //       const errorData = await response.json().catch(() => null); //에러 메시지 파싱
// //       throw new Error(errorData?.message || "Login failed"); //에러 메시지 던짐
// //     }

// //     //서버로부터 받은 데이터를 json형식으로 반환
// //     return await response.json();
// //   } catch (error: unknown) {
// //     // 로그인 요청 중 에러 발생할 경우 콘솔에 출력
// //     console.error("Login failed:", error);

// //     if (error instanceof Error) {
// //       throw error;
// //     }
// //     throw new Error("An unknown error occurred.");
// //   }
// // };

// // //사용자 정보 가져오는 함수
// // export const userInfo = async (userId: string): Promise<UserResponse> => {
// //   try {
// //     //특정 사용자의 프로필을 가져오기 위한 요청
// //     const response = await fetch(`${API_BASE_URL}/api/users/profile/${userId}`, {
// //       method: "GET",
// //     });

// //     if (!response.ok) {
// //       const errorData = await response.json().catch(() => null);
// //       throw new Error(errorData?.message || "Failed to fetch user data.");
// //     }

// //     return await response.json(); 
// //   } catch (error: unknown) {
// //     console.error("Failed to fetch user data:", error);
    
// //     if (error instanceof Error) {
// //       throw error;
// //     }
// //     throw new Error("An unknown error occurred.");
// //   }
// // };


// // src/api/userAPI.ts
// import { BASE_URL, getHeaders } from './index'
// import { User } from '@/types'

// // 특정 유저의 프로필 조회
// export async function getUserProfile(userId: string): Promise<User> {
//   const response = await fetch(`${BASE_URL}/users/profile/${userId}`, {
//     headers: getHeaders(),
//   })
  
//   if (!response.ok) {
//     throw new Error('프로필 조회 실패')
//   }
  
//   return response.json()
// }

// // 내 프로필 수정
// export async function updateMyProfile(userId: string, data: Partial<User>) {
//   const response = await fetch(`${BASE_URL}/users/profile/${userId}`, {
//     method: 'PUT',
//     headers: getHeaders(),
//     body: JSON.stringify(data),
//   })
  
//   if (!response.ok) {
//     throw new Error('프로필 수정 실패')
//   }
  
//   return response.json()
// }
