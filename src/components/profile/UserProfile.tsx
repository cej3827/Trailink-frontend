"use client"

import { useEffect, useState } from 'react';
import { useUserStore } from '../../store/useUserStore';
import { userInfo } from '../../api/userAPI';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
import ProfileActions from './ProfileActions';

interface UserProfile {
  userId: string;
  userName: string;
  profileImg: string;
}

interface UserProfileProps {
  id: string; // 프로필 사용자 ID를 받는 props
}

const UserProfile = ( { id }: UserProfileProps) => {
  const { currentUser } = useUserStore(); // Zustand 스토어에서 현재 로그인한 사용자 가져오기

  const [profileUser, setProfileUser] = useState<UserProfile | null>(null);

  //컴포넌트가 마운트될 때마다 사용자 프로필을 API로부터 불러옴
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (id == currentUser?.userId) {
        //현재 사용자의 프로필인 경우
        setProfileUser(currentUser);
      }
      else {
        //다른 사용자의 프로필인 경우
        try {
          // API 호출 및 데이터 가져오기
          const profileData = await userInfo(id);
    
          // 반환된 데이터가 배열이고 데이터가 있는지 확인
          if (Array.isArray(profileData) && profileData.length > 0) {
            // 첫 번째 사용자 데이터만 상태에 저장
            setProfileUser(profileData[0]);
          } else {
            // 빈 배열인 경우 에러 처리
            throw new Error('No user profile found.');
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
        }
      }
    };
    fetchUserProfile(); // 사용자 프로필 가져오기 함수 호출
  }, [id, currentUser]); // 변경될 때마다 다시 호출
  
  if (!profileUser) return null;

  const isOwnProfile = id === currentUser?.userId;

  //사용자 프로필 정보 렌더링
  return (
    <div className="userProfile">
      <ProfileHeader userProfile={profileUser} />
      <ProfileInfo userProfile={profileUser} />
      <ProfileActions isOwnProfile={isOwnProfile} userId={id} />
    </div>
  );
};

export default UserProfile;