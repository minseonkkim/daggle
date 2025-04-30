import Logo from "../assets/Logo.png";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  return (
    <>
      <div className="hidden sm:hidden md:flex items-center justify-between p-4 h-[86px] lg:px-[120px] md:px-[30px] border-b border-gray-200 shadow-[0_10px_10px_-8px_#e8e8e8] bg-white">
        <img src={Logo} alt="로고" className="w-auto h-[26px] block" />
        <CgProfile size={28} />
      </div>

      <div className="flex sm:flex md:hidden items-center justify-between h-14 px-4 bg-white">
        <RxHamburgerMenu size={23} />
      </div>
    </>
  );
}
