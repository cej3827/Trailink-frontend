import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useCategoryStore } from "./useCategoryStore";

// 사용자 상태를 나타내는 인터페이스
interface UserState {
  userId: string | null;
  userName: string | null;
  profileImg: string | null;
  isLoggedIn: boolean;
  token: string | null;
  setUser: (user: { userId: string; userName: string; profileImg: string; token: string}) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist( //미들웨어. 상태를 로컬 스토리지에 저장
    (set) => ({
      userId: null,
      userName: null,
      profileImg: null,
      isLoggedIn: false,
      token: null,
      setUser: (user) =>
        set({
          userId: user.userId,
          userName: user.userName,
          profileImg: user.profileImg || '/default_profile.jpg',
          isLoggedIn: true,
          token: user.token,
        }),
      logout: () =>
        set({
          userId: null,
          userName: null,
          profileImg: null,
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
