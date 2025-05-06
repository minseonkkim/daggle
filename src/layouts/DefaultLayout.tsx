import Header from "../components/Header";
import DesktopOnlyHeader from "../components/DesktopOnlyHeader";
import { ReactNode } from "react";

type DefaultLayoutProps = {
  children: ReactNode;
  headerType?: "default" | "desktopOnly";
};

export default function DefaultLayout({
  children,
  headerType = "default",
}: DefaultLayoutProps) {
  const HeaderComponent =
    headerType === "desktopOnly" ? DesktopOnlyHeader : Header;

  return (
    <div className="md:bg-gray-100 min-h-screen flex flex-col">
      <HeaderComponent />
      <main className="flex-grow lg:px-[120px] md:px-[30px] sm:px-[16px] mt-[56px] md:mt-[86px]">
        {children}
      </main>
    </div>
  );
}
