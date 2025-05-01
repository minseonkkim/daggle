import { useState } from "react";
import { loginApi } from "../api/auth";
import { useAuthStore } from "../stores/authStore";
import { useNavigate, Navigate } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";

export default function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loginIdError, setLoginIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const { login, isLoggedIn } = useAuthStore();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async () => {
    let hasError = false;

    if (!loginId.trim()) {
      setLoginIdError("아이디를 입력해주세요.");
      hasError = true;
    } else {
      setLoginIdError("");
    }

    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해주세요.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    try {
      const res = await loginApi({ loginId, password });
      console.log("✅ 로그인 성공:", res);
      login(res.user, res.tokens.accessToken, res.tokens.refreshToken);
      navigate("/");
    } catch (err: any) {
      console.error("❌ 로그인 실패:", err);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col md:items-center md:justify-center min-h-[calc(100vh-86px)]">
        <form className="bg-white md:p-8 mt-8 md:mt-0 md:rounded md:shadow-md w-full max-w-md md:rounded-[12px]">
          <h1 className="font-pretendard text-2xl font-bold leading-[1.6] mb-1">
            안녕하세요
            <br />
            <span className="text-[#320397]">한다글다글</span>
            입니다.
          </h1>
          <p className="font-pretendard font-semibold text-gray-400 mb-4">
            로그인을 통해 더 많은 기능을 이용하세요
          </p>
          <input
            type="text"
            placeholder="아이디를 입력해주세요."
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className={`border px-[16px] py-[12px] w-full mb-1 rounded-[8px] ${
              loginIdError ? "border-red-500 border-[2px]" : ""
            }`}
          />
          {loginIdError && (
            <p className="text-red-500 text-sm mb-2 font-semibold">
              {loginIdError}
            </p>
          )}

          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border px-[16px] py-[12px] w-full mt-2 mb-1 rounded-[8px] ${
              passwordError ? "border-red-500 border-[2px]" : ""
            }`}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mb-2 font-semibold">
              {passwordError}
            </p>
          )}
          <button
            type="button"
            onClick={handleLogin}
            className="bg-gray-900 font-semibold text-white rounded-[12px] px-[24px] py-[16px] mt-3 w-full rounded"
          >
            로그인
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
}
