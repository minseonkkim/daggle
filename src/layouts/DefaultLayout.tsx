import Header from "../components/Header";
import { ReactNode } from "react";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="md:bg-gray-100 min-h-screen">
      <Header />
      <main className="lg:px-[120px] md:px-[30px] sm:px-[16px]">
        {children}
      </main>
    </div>
  );
}
