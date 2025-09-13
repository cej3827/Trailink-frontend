"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useLogin } from "@/hooks/useAuth";
import { useUIStore } from "@/store/uiStore";

interface Props {
  onClose: () => void;
}

export default function LoginForm({ onClose }: Props) {
  const [user_id, setUserId] = useState("");
  const [user_password, setUserPassword] = useState("");
  const { setShowLoginForm } = useUIStore();
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { user_id, user_password },
      { onSuccess: () => setShowLoginForm(false) }
    );
  };

  const handleClose = () => {
    onClose();
    setShowLoginForm(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8 relative">
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
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {(loginMutation.error as Error).message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            이메일
          </label>
          <input
            id="id"
            type="id"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {loginMutation.isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
          비밀번호를 잊으셨나요?
        </a>
      </div>
    </div>
  );
}
