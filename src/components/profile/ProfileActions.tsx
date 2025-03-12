interface ProfileActionsProps {
  isOwnProfile: boolean;
  userId: string;
}

const ProfileActions = ({ isOwnProfile, userId }: ProfileActionsProps) => (
  <div className={"profileActions"}>
    {isOwnProfile ? (
      <button>Edit Profile</button>
    ) : (
      <button onClick={() => handleFollow(userId)}>Follow</button>
    )}
  </div>
);

//팔로우 기능
const handleFollow = (userId: string) => {
  // 팔로우 로직 구현
  console.log(`Following user: ${userId}`);
};

export default ProfileActions;
