import React, { useEffect, useState } from 'react';
import { useActivityStore } from '../store/useActivityStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; 

function FollowingActivityList() {
  // useActivityStore에서 상태 및 함수 가져오기
  const { activities, fetchActivities, removeActivity } = useActivityStore();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null); // 에러 메시지를 저장할 상태

  // 컴포넌트가 마운트될 때 활동 데이터 가져오기
  useEffect(() => {
    fetchActivities(); // 활동 데이터를 불러오는 함수 호출
  }, [fetchActivities]);

  //활동 항목에서 프로필을 클릭했을 때 처리하는 함수
  const handleProfileClick = (userId: string) => {
    //프로필로이동하는로직
    router.push(`/profile/${userId}`); // userId로 프로필 페이지로 이동
  };

  // 카테고리 항목을 클릭했을 때 처리하는 함수
  const handleCategoryClick = async (categoryId: number, activityId: number) => {
    try {
      await removeActivity(activityId); // 해당 활동 삭제
      router.push(`/category/${categoryId}`); // 카테고리 페이지로 이동
    } catch (error) {
      setError('Failed to remove activity'); // 에러 발생 시 메시지 설정
      console.error('Error handling category click:', error);
    }
  };

  // 에러 메시지 표시 추가
  if (error) {
    // return <div className="error-message">{error}</div>;
    return <div>{error}</div>
  }

  if (activities.length === 0) {
    return <div>No activities</div>; // 활동이 없으면 메시지 표시
  }
  
  // 활동 목록 렌더링
  return (
    <ul className="following-activity-list">
      {/* 활동 목록을 순회하며 각 활동을 리스트 항목으로 표시 */}
      {activities.map((activity) => (
        <li key={activity.activity_id} className="following-activity-item">
          {/* 사용자의 프로필 이미지 */}
          <Image
            src={activity.user_profile_img}
            alt={activity.user_name} 
            className="following-avatar"
            width={40}
            height={40}
          />
          <div className="following-activity-info">
            {/* 사용자 이름 클릭 시 프로필 페이지로 이동 */}
            <span className="following-name" onClick={() => handleProfileClick(activity.user_id)}>
              {activity.user_name}
            </span>
            <span className="activity-description">
              added a bookmark to {' '}
              {/* <strong onClick={() => handleCategoryClick(category?.id || '', activity.id)} className="category-link">
                {category.name}
              </strong> */}
              <strong onClick={() => handleCategoryClick(activity.category_id, activity.activity_id)} className="category-link">
                {activity.category_name}
              </strong>
            </span>
            <span className="new-badge">New!</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FollowingActivityList;
