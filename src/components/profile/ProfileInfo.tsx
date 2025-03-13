interface ProfileInfoProps {
  userProfile: {
    userId: string;
    userName: string;
  };
}

const ProfileInfo = ({ userProfile }: ProfileInfoProps) => (
  <div className="profileInfo">
    {/* <h2 className="userName">{userProfile.userName}</h2>
    <p className="userId">@{userProfile.userId}</p> */}
    <h2 className="userName">{userProfile.userName}</h2>
    <p>@{userProfile.userId}</p>
  </div>
);

export default ProfileInfo;
