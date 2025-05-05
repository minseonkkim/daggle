import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { TfiCommentAlt } from "react-icons/tfi";
import { getPostById } from "../api/post";
import { formatDate, formatFullDate } from "../utils/date";
import { getCommentsByPostId } from "../api/comment";

export interface PostDetail {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  viewCount: number;
  commentCount: number;
  isAuthor: boolean;
  content: string;
  author: Author;
}

export interface Author {
  loginId: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  id: string;
  nickname: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    nickname: string;
  };
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getPostById(id)
      .then((data) => setPost(data))
      .catch((err) => setError(err.message));
  }, [id]);

  useEffect(() => {
    if (!post?.id) return;

    getCommentsByPostId(post.id)
      .then((data) => setComments(data))
      .catch((err) => console.error("댓글 로딩 실패:", err));
  }, [post?.id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>로딩 중...</p>;

  return (
    <div className="md:bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow lg:px-[120px] md:px-[30px]">
        <div className="font-pretendard bg-white md:rounded-[12px] my-6 md:border-[1px] border-gray-200 overflow-hidden">
          <div className="sm:px-[16px] md:p-[24px] flex flex-col gap-[16px] md:gap-[24px]">
            <h1 className="text-[24px] font-bold text-gray-900">
              {post.title}
            </h1>
            <div className="flex flex-row justify-between">
              <p className="text-gray-500">
                {post.author.nickname}&nbsp;&nbsp;|&nbsp;&nbsp;
                {formatFullDate(post.createdAt)}
              </p>
              {post.isAuthor ?? (
                <div className="flex flex-row items-center gap-2">
                  <button>수정</button>
                  <button>삭제</button>
                </div>
              )}
            </div>
          </div>
          <hr className="hidden md:block" />
          <div className="sm:px-[16px] my-[16px] md:my-0 md:p-[24px] flex flex-col justify-between h-[210px] md:h-[261px] text-gray-800">
            <p>{post.content}</p>
            <div className="flex flex-row items-center gap-2 text-gray-800">
              <TfiCommentAlt />
              <span>{post.commentCount}개</span>
            </div>
          </div>
          <hr />
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="sm:px-[16px] flex flex-col bg-gray-100 gap-[16px] py-[16px] md:py-[24px] md:px-[24px]"
            >
              <div className="flex flex-row justify-between">
                <div className="text-gray-900">{comment.user.nickname}</div>
                <div className="flex flex-row items-center gap-2 text-gray-500">
                  <button>수정</button>
                  <button>삭제</button>
                </div>
              </div>
              <div className="text-gray-800">{comment.content}</div>
              <div className="text-gray-500">
                {formatDate(comment.createdAt)}
              </div>
            </div>
          ))}
          <hr />
          <div
            className="bg-white md:p-[24px] flex flex-row md:gap-[12px] sm:p-[16px]
                    sm:fixed sm:bottom-0 sm:left-0 sm:w-full
                    md:static md:w-auto"
          >
            <input
              className="flex-grow placeholder-gray-500 p-[12px] border-b border-gray-300 focus:outline-none focus:border-gray-500"
              placeholder="댓글을 통해 자유롭게 의견을 나눠보세요"
            />
            <button className="bg-black text-white text-[18px] px-[24px] py-[16px] rounded-[12px] font-semibold">
              등록
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
