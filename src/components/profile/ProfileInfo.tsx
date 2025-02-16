interface ProfileInfoProps {
  userProfile: {
    userId: string;
    userName: string;
  };
}

const ProfileInfo = ({ userProfile }: ProfileInfoProps) => (
  <div className="profileInfo">
    {/* <p>{userProfile.userName}</p> */}
  </div>
);

export default ProfileInfo;
