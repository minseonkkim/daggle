import Banner from "../components/Banner";
import DefaultLayout from "../layouts/DefaultLayout";
import bannerImg1 from "../assets/card1.jpg";
import bannerImg2 from "../assets/card2.jpg";
import bannerImg3 from "../assets/card3.jpg";
import bannerImg4 from "../assets/card4.jpg";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { TfiCommentAlt } from "react-icons/tfi";

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

const posts = [
  {
    id: "1",
    createdAt: "25.05.02",
    title: "첫 번째 게시글입니다.",
    viewCount: 123,
    commentCount: 2,
  },
  {
    id: "2",
    createdAt: "25.04.30",
    title: "두 번째 글",
    viewCount: 77,
    commentCount: 0,
  },
  {
    id: "3",
    createdAt: "25.04.28",
    title: "세 번째 글입니다.",
    viewCount: 45,
    commentCount: 0,
  },
];

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

        <div className="overflow-hidden group cursor-pointer mb-[40px]">
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

        <div className="bg-white rounded-[12px]">
          <div className="flex flex-row items-center justify-between mb-4 pt-[24px] px-[24px]">
            <div className="font-bold text-[24px]">게시판</div>
            <button
              style={{ backgroundColor: "#6025E1" }}
              className="text-white px-4 py-2.5 rounded-[8px] font-bold"
            >
              글쓰기
            </button>
          </div>
          <table className="w-full table-fixed border-t border-b border-gray-200 text-left text-[18px]">
            <colgroup>
              <col style={{ width: "80%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "5%" }} />
            </colgroup>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="cursor-pointer">
                  <td className="py-3.5 px-[24px] border-b w-[80%] text-[18px]">
                    <div className="truncate whitespace-nowrap overflow-hidden">
                      {post.title}
                    </div>
                  </td>
                  <td className="py-3.5 px-[24px] border-b w-[10%] text-[16px] text-gray-500">
                    {post.createdAt}
                  </td>
                  <td className="py-3.5 px-[24px] border-b w-[10%] text-[16px] text-gray-500">
                    <div className="flex flex-row items-center gap-1">
                      <TfiCommentAlt />
                      {post.commentCount}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-center items-center space-x-2 text-sm pb-[24px] px-[24px]">
            <button
              className="p-2 text-gray-600 hover:text-black disabled:text-gray-300"
              disabled
            >
              <HiChevronLeft size={20} />
            </button>

            <button className="px-3 py-1 rounded hover:bg-gray-100">1</button>
            <button className="px-3 py-1 rounded hover:bg-gray-100">2</button>
            <button className="px-3 py-1 rounded hover:bg-gray-100">3</button>

            <button className="p-2 text-gray-600 hover:text-black">
              <HiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
