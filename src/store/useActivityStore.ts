const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import { create } from 'zustand';
import { useUserStore } from './useUserStore';

interface Activity {
  activity_id: number;
  user_id: string;
  user_name: string;
  user_profile_img: string;
  category_id: number;
  category_name: string;
}

//Zustand 스토어에서 관리할 상태의 형태와 그 상태를 변경하는 메서드를 정의
interface AppState {
  activities: Activity[]; // 팔로워 활동 목록
  fetchActivities: () => void; // 활동 데이터 가져오는 메소드
  removeActivity: (activityId: number) => void; // 활동 항목 제거 메소드
}

//create를 사용하여 Zustand 스토어를 생성
export const useActivityStore = create<AppState>((set) => ({
  activities: [], // 활동 목록을 저장하는 배열
  // api를 호출하여 서버에서 활동 목록을 가져옴
  fetchActivities: async () => {
    try {
      const { token, logout } = useUserStore.getState();
      if (!token) {
        console.warn('No token found. Please log in.');
        return;
      }
      // api 호출
      const response = await fetch(`${API_BASE_URL}/api/activity`, {
        headers: {
          'Authorization': `Bearer ${token}`, // 토큰 추가
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        if (response.status === 401) {
          console.warn('Token is expired'); // 토큰 만료 오류 처리
          logout(); // 로그아웃 처리
          return;
        }
        throw new Error('Failed to fetch activities'); //그외 오류 예외 처리
      }

      const activities = await response.json(); //활동 데이터를 json으로 파싱

      // 프로필 이미지가 없으면 기본 이미지로 설정
      const updatedActivities = activities.map((activity: Activity) => ({
        ...activity,
        user_profile_img: activity.user_profile_img || '/default_profile.jpg', // 기본 이미지 설정
      }));

      set({ activities : updatedActivities }); // 상태 업데이트
      } catch (error) {
      console.error('Error fetching activities:', error);
      }
  },
  
  // 활동 항목 삭제하는 함수
  removeActivity: async(activityId) => {
    try {
      // 서버에 DELETE 요청
      const response = await fetch(`${API_BASE_URL}/api/activity/${activityId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete activity');
      
      // 삭제된 활동을 상태에서 삭제
      set((state) => ({
        activities: state.activities.filter(
          (activity) => activity.activity_id !== activityId
        ),
      }));
    } catch (error) {
      console.error('Error removing activity:', error);
    }
  }
}));
