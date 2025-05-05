import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { TfiCommentAlt } from "react-icons/tfi";
import { getPostById } from "../apis/post";
import { formatDate, formatFullDate } from "../utils/date";
import {
  createComment,
  deleteComment,
  getCommentsByPostId,
  updateComment,
} from "../apis/comment";
import { PostDetail } from "../types/post";
import { Comment } from "../types/comment";
import { useAuthStore } from "../stores/authStore";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const commentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const userId = useAuthStore((state) => state.user?.id);

  const [scrollToCommentId, setScrollToCommentId] = useState<string | null>(
    null
  );

  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (scrollToCommentId) {
      const ref = commentRefs.current[scrollToCommentId];
      if (ref) {
        ref.scrollIntoView({ behavior: "smooth", block: "center" });
        setScrollToCommentId(null);
      }
    }
  }, [comments, scrollToCommentId]);

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

  const handleSubmitComment = async () => {
    if (!post?.id || newComment.trim() === "") return;

    try {
      if (editingCommentId) {
        const updated = await updateComment(post.id, editingCommentId, {
          content: newComment,
        });
        setComments((prev) =>
          prev.map((c) => (c.id === editingCommentId ? updated : c))
        );
        setEditingCommentId(null);
        setScrollToCommentId(editingCommentId);
        window.alert("댓글이 수정되었습니다.");
      } else {
        const created = await createComment(post.id, { content: newComment });
        setNewComment("");
        const refreshedComments = await getCommentsByPostId(post.id);
        setComments(refreshedComments);
        setScrollToCommentId(created.id);
      }
    } catch (err: any) {
      window.alert(
        editingCommentId
          ? "댓글 수정에 실패했습니다."
          : "댓글 등록에 실패했습니다."
      );
      console.error(err.message);
    }
  };

  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setNewComment(comment.content);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!post?.id) return;

    const confirm = window.confirm("정말 이 댓글을 삭제하시겠습니까?");
    if (!confirm) return;

    try {
      await deleteComment(post.id, commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      window.alert("댓글이 삭제되었습니다.");
    } catch (err: any) {
      console.error("댓글 삭제 실패:", err.message);
      window.alert("댓글 삭제에 실패했습니다.");
    }
  };

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
              ref={(el) => {
                commentRefs.current[comment.id] = el;
              }}
              className="sm:px-[16px] flex flex-col bg-gray-100 gap-[16px] py-[16px] md:py-[24px] md:px-[24px]"
            >
              <div className="flex flex-row justify-between">
                <div className="text-gray-900">{comment.user.nickname}</div>
                {userId === comment.user.id ? (
                  <div className="flex flex-row items-center gap-2 text-gray-500">
                    <button onClick={() => startEditing(comment)}>수정</button>
                    <button onClick={() => handleDeleteComment(comment.id)}>
                      삭제
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
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
              ref={inputRef}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow text-[14px] md:text-[16px] placeholder-gray-500 p-[12px] border-b border-gray-300 focus:outline-none focus:border-gray-500"
              placeholder="댓글을 통해 자유롭게 의견을 나눠보세요"
            />
            <button
              onClick={handleSubmitComment}
              className="text-[16px] md:text-[18px] w-[84px] h-[48px] md:w-[89px] md:h-[52px] bg-gray-900 hover:bg-gray-800 active:bg-gray-700 disabled:bg-[#D6D7DC] text-white text-[18px] rounded-[12px] font-semibold"
              disabled={!isLoggedIn}
            >
              {editingCommentId ? "수정" : "등록"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
