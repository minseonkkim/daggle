import Logo from "../assets/Logo.png";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const { isLoggedIn, user, logout } = useAuthStore();
  const [showPopover, setShowPopover] = useState(false);
  const [showSheet, setShowSheet] = useState(false);

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
      <div className="fixed inset-0 hidden sm:hidden md:flex items-center justify-between p-4 h-[86px] lg:px-[120px] md:px-[30px] border-b border-gray-200 shadow-[0_10px_10px_-8px_#e8e8e8] bg-white z-[100000000]">
        {isHome ? (
          <img
            src={Logo}
            alt="로고"
            className="w-auto h-[24px] block cursor-pointer "
          />
        ) : (
          <Link to="/">
            <img
              src={Logo}
              alt="로고"
              className="w-auto h-[24px] block cursor-pointer cursor-pointer"
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
                    {user?.nickname ? user?.nickname + "님" : "?님"}
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
            className="font-pretendard font-semibold cursor-pointer "
            onClick={() => navigate("/login")}
          >
            로그인
          </div>
        )}
      </div>

      <div className="fixed inset-0 h-[56px] flex sm:flex md:hidden items-center justify-between h-14 px-4 bg-white z-[100000000]">
        <RxHamburgerMenu
          size={23}
          className="cursor-pointer"
          onClick={() => setShowSheet(true)}
        />
      </div>

      {showSheet && (
        <div className="fixed inset-0 z-[500000000]">
          <div
            className="fixed inset-0 bg-black opacity-70"
            onClick={() => setShowSheet(false)}
          />
          <div className="fixed top-0 left-0 w-72 h-full bg-white shadow-lg p-4 z-50 animate-slide-in">
            <div className="flex justify-end mb-4">
              <IoClose
                size={24}
                className="cursor-pointer text-[#A7A9B4]"
                onClick={() => setShowSheet(false)}
              />
            </div>
            {isLoggedIn && (
              <div>
                <p className="font-pretendard text-lg font-semibold mb-6">
                  {user?.nickname ? user?.nickname + "님" : "?님"}
                </p>
                <hr />
              </div>
            )}

            <div className="font-pretendard space-y-4 mt-6">
              {isLoggedIn ? (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    if (confirm("정말 로그아웃하시겠습니까?")) {
                      alert("로그아웃되었습니다.");
                      logout();
                      setShowPopover(false);
                    }
                  }}
                >
                  로그아웃
                </div>
              ) : (
                <div
                  className="cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  로그인
                </div>
              )}
              <div
                className="cursor-pointer"
                onClick={() => {
                  navigate("/");
                }}
              >
                커뮤니티
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
