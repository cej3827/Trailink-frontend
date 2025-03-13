import Image from 'next/image';

interface ProfileHeaderProps {
  userProfile: {
    userName: string;
    profileImg: string;
  };
}

const ProfileHeader = ({ userProfile }: ProfileHeaderProps) => (
  <div className="profileHeader">
    <Image
      src={userProfile.profileImg}
      alt={userProfile.userName}
      width={100}
      height={100}
      className="profileImage"
    />
    {/* <h1 className="userName">{userProfile.userName}</h1> */}
  </div>
);

export default ProfileHeader;
