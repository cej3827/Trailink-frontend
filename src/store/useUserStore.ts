import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { useCategoryStore } from "./useCategoryStore";

interface UserProfile {
  userId: string;
  userName: string;
  profileImg: string;
}

// 사용자 상태를 나타내는 인터페이스
interface UserStore {
  currentUser: UserProfile | null;
  isLoggedIn: boolean;
  token: string | null;
  setCurrentUser: (user: UserProfile & { token: string }) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist( //미들웨어. 상태를 로컬 스토리지에 저장
    (set) => ({
      currentUser: null,
      isLoggedIn: false,
      token: null,
      setCurrentUser: (user) =>
        set({
          currentUser: {
            userId: user.userId,
            userName: user.userName,
            profileImg: user.profileImg || '/default_profile.jpg',
          },
          isLoggedIn: true,
          token: user.token,
        }),
      logout: () =>
        set({
          currentUser: null,
          isLoggedIn: false,
          token: null,
        }),
        // useCategoryStore 상태 초기화
        // useCategoryStore.getState().clearCategories();
    }),
    {
      name: "user-store", // 로컬 스토리지 키 이름
    }
  )
);
