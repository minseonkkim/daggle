import { useEffect, useRef, useState } from "react";
import { getPosts, Post } from "../api/post";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { TfiCommentAlt } from "react-icons/tfi";
import { FiEdit2 } from "react-icons/fi";
import { formatDate } from "../utils/date";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { useNavigate } from "react-router-dom";

function useIsMdUp() {
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const check = () => setIsMdUp(window.innerWidth >= 642);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMdUp;
}

export default function PostList() {
  const isMdUp = useIsMdUp();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const navigate = useNavigate();

  const handleClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  const fetchPosts = async (pageNum: number) => {
    setLoading(true);
    try {
      const data = await getPosts(pageNum, limit);
      console.log(data);
      if (isMdUp) {
        setPosts(data.items);
      } else {
        setPosts((prev) => [...prev, ...data.items]);
      }
      setTotalPages(data.meta.totalPages);
      setHasMore(pageNum < data.meta.totalPages);
    } catch (error) {
      console.error("게시글 조회 실패", error);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page, isMdUp]);

  const isFetchingRef = useRef(false);

  const loadMore = () => {
    if (loading || !hasMore || isFetchingRef.current) return;
    isFetchingRef.current = true;
    setPage((prev) => prev + 1);
  };

  const lastPostRef = useInfiniteScroll(loadMore, hasMore);

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
              <col style={{ width: "70%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
          ) : (
            <colgroup>
              <col style={{ width: "100%" }} />
            </colgroup>
          )}
          <tbody>
            {loading && posts.length === 0 ? (
              <tr>
                <td className="text-center py-10 text-gray-500" colSpan={4}>
                  불러오는 중...
                </td>
              </tr>
            ) : (
              posts.map((post, idx) => {
                const isLast = idx === posts.length - 1 && !isMdUp;
                return (
                  <tr
                    key={post.id}
                    className="cursor-pointer"
                    ref={isLast ? lastPostRef : undefined}
                    onClick={() => handleClick(post.id)}
                  >
                    <td className="py-3.5 md:px-[24px] border-b w-full">
                      <div className="truncate font-semibold md:font-normal text-[16px] md:text-[18px]">
                        {post.title}
                      </div>
                      <div className="md:hidden text-[14px] flex justify-between items-center text-gray-500 mt-2">
                        <div className="flex flex-row items-center gap-2">
                          <span>{formatDate(post.createdAt)}</span>
                          <span className="flex items-center gap-1">
                            <TfiCommentAlt size={14} />
                            {post.commentCount}
                          </span>
                        </div>
                        <div>닉네임</div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell py-3.5 px-[24px] border-b text-gray-500">
                      {formatDate(post.createdAt)}
                    </td>
                    <td className="hidden md:table-cell py-3.5 px-[24px] border-b text-gray-500">
                      <div className="flex items-center gap-1">
                        <TfiCommentAlt />
                        {post.commentCount}
                      </div>
                    </td>
                    <td className="hidden md:table-cell py-3.5 px-[24px] border-b text-gray-500">
                      사진
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {isMdUp && (
          <div className="mt-6 px-[24px] pb-[24px] hidden md:flex justify-center items-center space-x-2 text-sm">
            <button
              type="button"
              className="p-2 text-gray-600 hover:text-black disabled:text-gray-300"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              <HiChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                type="button"
                key={i + 1}
                className={`px-3 py-1 rounded ${
                  page === i + 1 ? "bg-gray-200 font-bold" : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              type="button"
              className="p-2 text-gray-600 hover:text-black disabled:text-gray-300"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        )}
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
