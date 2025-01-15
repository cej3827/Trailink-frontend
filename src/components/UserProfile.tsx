import React, { useEffect, useState } from 'react';
import { useUserStore } from '../store/useUserStore';
import { userInfo } from '../api/userAPI';
import LoadingSpinner from './LoadingSpinner';

interface UserProfileProps {
  id: string; // 프로필 사용자 ID를 받는 props
}

const UserProfile = ( { id }: UserProfileProps) => {
  const { userId } = useUserStore(); // Zustand 스토어에서 현재 로그인한 사용자 ID 가져오기
  // 사용자 프로필 데이터를 저장할 상태 선언
  const [userProfile, setUserProfile] = useState<{
    user_id: string;
    user_name: string;
    user_profile_img: string;
  } | null>(null);

  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  const isOwnProfile = id === userId; // 자신의 프로필인지 확인

  //컴포넌트가 마운트될 때마다 사용자 프로필을 API로부터 불러옴
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
  
        // API 호출 및 데이터 가져오기
        const profileData = await userInfo(id);
  
        // 반환된 데이터가 배열이고 데이터가 있는지 확인
        if (Array.isArray(profileData) && profileData.length > 0) {
          // 첫 번째 사용자 데이터만 상태에 저장
          setUserProfile(profileData[0]);
        } else {
          // 빈 배열인 경우 에러 처리
          setError('No user profile found.');
        }
      } catch (err: any) {
        console.error('Error fetching user profile:', err);
        setError(err.message || 'Failed to load user profile.');
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };
  
    fetchUserProfile(); // 사용자 프로필 가져오기 함수 호출
  }, [id]); // id가 변경될 때마다 다시 호출
  

  if (loading) return <LoadingSpinner />; // 로딩 중일 때 표시
  if (error) return <div>Error: {error}</div>; // 에러 발생 시 표시
  if (!userProfile) return <div>User not found</div>; // 데이터가 없을 때 표시

  //사용자 프로필 정보 렌더링
  return (
    <div className="user-profile">
      <img src={userProfile.user_profile_img} alt={userProfile.user_id} />
      <h1>{userProfile.user_name}</h1>
      {/* <p>Followers {user.followers.length}</p>
      <p>Following {user.following.length}</p> */}

      {/* 자신의 프로필이면 'Edit Profile' 버튼을 렌더링 */}
      {isOwnProfile ? (
        <button>Edit Profile</button>
      ) : (
        // <button onClick={() => isFollowing ? unfollowUser(user.id) : followUser(user.id)}>
        //   {isFollowing ? 'Unfollow' : 'Follow'}
        // </button>
        <></>
      )}
    </div>
  );
};


export default UserProfile;