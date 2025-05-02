import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { TfiCommentAlt } from "react-icons/tfi";
import { FiEdit2 } from "react-icons/fi";

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

function useIsMdUp() {
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const check = () => setIsMdUp(window.innerWidth >= 642); // md 기준
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMdUp;
}

export default function PostList() {
  const isMdUp = useIsMdUp();
  return (
    <>
      <div className="bg-white rounded-[12px]">
        <div className="flex flex-row items-center justify-between mb-4 md:pt-[24px] md:px-[24px]">
          <div className="font-bold text-[24px]">게시판</div>
          <button
            style={{ backgroundColor: "#6025E1" }}
            className="hidden md:block text-white px-4 py-2.5 rounded-[8px] font-bold"
          >
            글쓰기
          </button>
        </div>
        <table className="w-full table-fixed md:border-t md:border-b border-gray-200 text-left text-[18px]">
          {isMdUp ? (
            <colgroup>
              <col style={{ width: "77%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "3%" }} />
              <col style={{ width: "5%" }} />
            </colgroup>
          ) : (
            <colgroup>
              <col style={{ width: "100%" }} />
            </colgroup>
          )}
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="cursor-pointer">
                <td className="py-3.5 md:px-[24px] border-b w-full">
                  <div className="truncate whitespace-nowrap overflow-hidden font-semibold md:font-normal text-[16px] md:text-[18px]">
                    {post.title}
                  </div>

                  <div className="md:hidden text-[14px] flex flex-row justify-between items-center">
                    <div className="mt-3 mb-1 flex items-center gap-2 text-gray-500">
                      <span>{post.createdAt}</span>
                      <span className="flex items-center gap-1">
                        <TfiCommentAlt size={14} />
                        {post.commentCount}
                      </span>
                    </div>
                    <div>닉네임</div>
                  </div>
                </td>

                <td className="py-3.5 px-[24px] border-b w-[10%] text-[16px] text-gray-500 hidden md:table-cell">
                  {post.createdAt}
                </td>
                <td className="py-3.5 px-[24px] border-b w-[10%] text-[16px] text-gray-500 hidden md:table-cell">
                  <div className="flex flex-row items-center gap-1">
                    <TfiCommentAlt />
                    {post.commentCount}
                  </div>
                </td>
                <td className="py-3.5 px-[24px] border-b w-[10%] text-[16px] text-gray-500 hidden md:table-cell">
                  사진
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 px-[24px] pb-[24px] hidden md:flex justify-center items-center space-x-2 text-sm">
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
      <button
        className="md:hidden fixed bottom-6 right-6 bg-[#6025E1] text-white p-[16px] rounded-full shadow-lg z-40"
        aria-label="글쓰기"
      >
        <FiEdit2 size={20} />
      </button>
    </>
  );
}
