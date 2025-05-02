import Banner from "../components/Banner";
import DefaultLayout from "../layouts/DefaultLayout";
import bannerImg1 from "../assets/card1.jpg";
import bannerImg2 from "../assets/card2.jpg";
import bannerImg3 from "../assets/card3.jpg";
import bannerImg4 from "../assets/card4.jpg";

const bannerList = [
  {
    title: "프린티",
    subtitle: "주식회사 프린티",
    desc: "작가와 팬을 잇는 일러스트 출력 플랫폼",
    img: bannerImg1,
  },
  {
    title: "G-Alpha",
    subtitle: "(주)씨에어허브",
    desc: "물류 관계자 비교견적 솔루션",
    img: bannerImg2,
  },
  {
    title: "KOSTA-EDU",
    subtitle: "한국소프트웨어 기술진흥협회",
    desc: "학습관리 시스템",
    img: bannerImg3,
  },
  {
    title: "달콤수학",
    subtitle: "달콤교육",
    desc: "엄마표 온라인 수학교육 강의 플랫폼",
    img: bannerImg4,
  },
];

export default function HomePage() {
  return (
    <DefaultLayout>
      <div className="font-pretendard md:pt-[100px] w-full">
        <div className="text-center text-[16px] md:text-[18px] text-[#5E616E] font-bold mb-2">
          다글제작소
        </div>
        <div className="text-center font-bold text-[24px] md:text-[32px] mb-[45px]">
          다글제작소의 과제전형에
          <br />
          오신 것을 환영합니다.
        </div>

        <div className="overflow-hidden group cursor-pointer">
          <div className="flex w-max animate-scrollX pause-on-hover whitespace-nowrap">
            {[...bannerList, ...bannerList].map((item, idx) => (
              <div key={idx} className="inline-block mx-2">
                <Banner
                  title={item.title}
                  subtitle={item.subtitle}
                  desc={item.desc}
                  img={item.img}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
