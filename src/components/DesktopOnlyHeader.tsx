import Logo from "../assets/Logo.png";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useEffect, useRef, useState } from "react";

function useIsMdUp() {
  const [isMdUp, setIsMdUp] = useState(window.innerWidth >= 642);
  useEffect(() => {
    const onResize = () => setIsMdUp(window.innerWidth >= 642);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMdUp;
}

export default function DesktopOnlyHeader() {
  const isMdUp = useIsMdUp();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/home";
  const { isLoggedIn, user, logout } = useAuthStore();
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setShowPopover(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isMdUp) return null;

  return (
    <div className="fixed inset-0 hidden sm:hidden md:flex items-center justify-between p-4 h-[86px] lg:px-[120px] md:px-[30px] border-b border-gray-200 shadow-[0_10px_10px_-8px_#e8e8e8] bg-white z-[200]">
      {isHome ? (
        <img
          src={Logo}
          alt="로고"
          className="w-auto h-[24px] block cursor-pointer"
        />
      ) : (
        <Link to="/home">
          <img
            src={Logo}
            alt="로고"
            className="w-auto h-[24px] block cursor-pointer"
          />
        </Link>
      )}
      {isLoggedIn ? (
        <div className="relative">
          <CgProfile
            size={28}
            className="cursor-pointer"
            onClick={() => setShowPopover((prev) => !prev)}
          />
          {showPopover && (
            <div
              ref={popoverRef}
              className="font-pretendard absolute right-0 mt-10 w-40 bg-white rounded-[12px] shadow-[4px_4px_10px_rgba(120,120,120,0.25)] px-[24px] py-[20px] z-50"
            >
              <div className="flex flex-row items-center gap-2 mb-1">
                <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                <p className="text-sm font-semibold">
                  {user?.nickname ? user?.nickname + "님" : "(닉네임 없음)님"}
                </p>
              </div>
              <button
                className="text-xs text-red-500 mt-2"
                onClick={() => {
                  if (confirm("정말 로그아웃하시겠습니까?")) {
                    alert("로그아웃되었습니다.");
                    logout();
                    setShowPopover(false);
                  }
                }}
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          className="font-pretendard font-semibold cursor-pointer"
          onClick={() => navigate("/login")}
        >
          로그인
        </div>
      )}
    </div>
  );
}
