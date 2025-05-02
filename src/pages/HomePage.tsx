import BannerCarousel from "../components/BannerCarousel";
import PostList from "../components/PostList";
import DefaultLayout from "../layouts/DefaultLayout";

export default function HomePage() {
  return (
    <DefaultLayout>
      <div className="font-pretendard md:py-[100px] w-full">
        <div className="text-center text-[16px] md:text-[18px] text-[#5E616E] font-bold mb-2">
          다글제작소
        </div>
        <div className="text-center font-bold text-[24px] md:text-[32px] mb-[45px]">
          다글제작소의 과제전형에
          <br />
          오신 것을 환영합니다.
        </div>

        <BannerCarousel />

        <PostList />
      </div>
    </DefaultLayout>
  );
}
