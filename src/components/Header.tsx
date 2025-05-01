import Logo from "../assets/Logo.png";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
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

  return (
    <>
      <div className="hidden sm:hidden md:flex items-center justify-between p-4 h-[86px] lg:px-[120px] md:px-[30px] border-b border-gray-200 shadow-[0_10px_10px_-8px_#e8e8e8] bg-white">
        {isHome ? (
          <img
            src={Logo}
            alt="로고"
            className="w-auto h-[26px] block cursor-pointer "
          />
        ) : (
          <Link to="/">
            <img
              src={Logo}
              alt="로고"
              className="w-auto h-[26px] block cursor-pointer cursor-pointer"
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
                className="absolute right-0 mt-10 w-40 bg-white rounded-[12px] shadow-[4px_4px_10px_rgba(120,120,120,0.25)] px-[24px] py-[20px] z-50"
              >
                <p className="text-sm font-semibold mb-1">
                  {user?.nickname ? user?.nickname + "님" : "?님"}
                </p>
                <button
                  className="text-xs text-red-500 mt-2"
                  onClick={() => {
                    if (confirm("정말 로그아웃하시겠습니까?")) {
                      alert("로그아웃되었습니다.");
                      logout();
                      setShowPopover(false);
                      navigate("/login");
                    }
                  }}
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="font-semibold cursor-pointer">로그인</div>
        )}
      </div>

      <div className="flex sm:flex md:hidden items-center justify-between h-14 px-4 bg-white">
        <RxHamburgerMenu size={23} />
      </div>
    </>
  );
}
