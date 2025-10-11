"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useLogin } from "@/hooks/useAuth";
import { useUIStore } from "@/store/uiStore";

export default function LoginForm() {
  const { setShowLoginForm } = useUIStore();
  const loginMutation = useLogin();
  const [user_id, setUserId] = useState("");
  const [user_password, setUserPassword] = useState("");

  const handleClose = () => {
    setShowLoginForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { user_id, user_password },
      { onSuccess: () => setShowLoginForm(false) }
    );
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white border-2 border-black p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="닫기"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">로그인</h2>
          <p className="text-gray-600 mt-2">계정에 로그인하세요</p>
        </div>

        {loginMutation.error && (
          <div className="text-center mb-4 p-3 text-red-700 rounded">
            {(loginMutation.error as Error).message} 😭
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">
              아이디
            </label>
            <input
              id="id"
              type="id"
              value={user_id}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={user_password}
              onChange={(e) => setUserPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-gray-700 hover:bg-gray-800 disabled:bg-blue-400 text-white font-semibold py-3 px-4 transition-colors duration-200"
          >
            {loginMutation.isPending ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-800">
            비밀번호를 잊으셨나요?
          </Link>
        </div>
      </div>
    </div>
  );
}
