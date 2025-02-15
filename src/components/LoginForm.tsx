import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUserStore } from "../store/useUserStore";
import { loginUser } from "../api/userAPI"; // 사용자 로그인 API 호출 함수
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  userId: z.string().min(1, { message: "아이디를 입력해주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // 로그인 에러 메시지를 상태로 관리
  const setUser = useUserStore((state) => state.setUser); // Zustand에서 setUser 함수를 가져와서 사용자 정보를 설정
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await loginUser(data.userId, data.password);
      if (response.success && response.data) {
        setUser({
          userId: response.data.user_id,
          userName: response.data.user_name,
          profileImg: response.data.profile_img,
          token: response.token,
        });
        router.replace("/");
      } else {
        setError(response.message || "로그인에 실패했습니다.");
      }
    } catch (err: any) {
      setError(err.message || "예기치 않은 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // // 로그인 폼 제출 처리 함수
  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
  //   // setError(""); // 로그인 시 에러 메시지 초기화

  //   try {
  //     const response = await loginUser(userId, password); // 로그인 API 호출
  //     // 로그인 성공 시
  //     if (response.success && response.data) {
  //       // Zustand 상태에 사용자 정보 저장
  //       setUser({
  //         userId: response.data.user_id,
  //         userName: response.data.user_name,
  //         profileImg: response.data.profile_img,
  //         token: response.token,
  //       });
  //       // 로그인 후 메인 페이지로 이동
  //       router.replace("/");
  //     } else {
  //       // 로그인 실패 시 에러 메시지 설정
  //       setError(response.message || "Login failed.");
  //     }
  //   } catch (err: any) {
  //     // 예상치 못한 에러 발생 시 에러 메시지 설정
  //     setError(err.message || "An unexpected error occurred.");
  //   }
  // };

  return (
    <div className="login-form">
      <h1>Login</h1>
      {/* 폼 제출 시 handleLogin 함수 실행 */}
      <form onSubmit={handleSubmit(onSubmit)} >
        <div>
          <input
            type="text"
            id="userId"
            {...register("userId")}
            disabled={isLoading}
            // value={userId}
            // onChange={(e) => setUserId(e.target.value)} 
            placeholder="ID"
            required // 필수 입력 항목
          /> 
          {errors.userId && <p className="errorMessage">{errors.userId.message}</p>}
          </div>
          <div>
            <input
            type="password"
            id="password"
            {...register("password")}
            disabled={isLoading}
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            />
            {errors.password && <p className="errorMessage">{errors.password.message}</p>}
          </div>

        <button 
          type="submit"
          disabled={isLoading}
        >
        Log in
        </button>
      </form>
    </div>
  );
}
