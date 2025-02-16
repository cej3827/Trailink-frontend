interface ProfileActionsProps {
  isOwnProfile: boolean;
  userId: string;
}

const ProfileActions = ({ isOwnProfile, userId }: ProfileActionsProps) => (
  <div className={"profileActions"}>
    {isOwnProfile ? (
      <button>Edit Profile</button>
    ) : (
      <button>Follow</button>
    )}
  </div>
);

export default ProfileActions;
