import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { TfiCommentAlt } from "react-icons/tfi";

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

export default function PostList() {
  return (
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
  );
}
