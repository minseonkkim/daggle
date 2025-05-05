import { useEffect, useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { useAuthStore } from "../stores/authStore";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { createPost, getPostById, updatePostById } from "../apis/post";

export default function PostWritePage() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [initialTitle, setInitialTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");

  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      getPostById(id!).then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setInitialTitle(data.title);
        setInitialContent(data.content);
      });
    }
  }, [id]);

  const isUnchanged =
    isEditMode && title === initialTitle && content === initialContent;
  const isEmpty = !title.trim() || !content.trim();
  const isDisabled = isEmpty || isUnchanged;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isDisabled) return;

    try {
      if (isEditMode) {
        await updatePostById(id!, { title, content });
        alert("게시글이 수정되었습니다.");
        navigate(`/posts/${id}`);
      } else {
        let valid = true;

        if (title.length < 1) {
          setTitleError("제목은 최소 1자 이상 입력해주세요.");
          valid = false;
        } else {
          setTitleError("");
        }

        if (content.length < 5) {
          setContentError("내용은 최소 5자 이상 입력해주세요.");
          valid = false;
        } else {
          setContentError("");
        }

        if (!valid) return;

        try {
          const post = await createPost({ title, content });
          alert("게시글이 등록되었습니다.");
          navigate(`/posts/${post.id}`);
        } catch (err: any) {
          console.error("게시글 생성 실패:", err.message);
          alert("게시글 생성에 실패했습니다.");
        }
      }
    } catch (err) {
      alert("요청 실패");
    }
  };

  return (
    <DefaultLayout>
      <form
        onSubmit={handleSubmit}
        className="font-pretendard flex flex-col items-center w-full"
      >
        <div className="flex flex-col bg-white w-full md:p-[24px] gap-[24px] md:rounded-[12px] my-6 md:border-[1px] border-gray-200 overflow-hidden">
          <h1 className="font-bold text-[20px]">게시글 작성</h1>

          <div className="flex flex-col">
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`border rounded-[8px] px-[16px] py-[12px] ${
                titleError ? "border-red-500 border-[2px]" : "border-gray-300"
              }`}
              placeholder="제목을 입력해주세요."
            />
            {titleError && (
              <p className="text-red-500 text-sm text-[14px] font-semibold mt-1">
                {titleError}
              </p>
            )}
          </div>
          <div>
            <div className="relative flex flex-col">
              <textarea
                name="content"
                value={content}
                maxLength={300}
                onChange={(e) => setContent(e.target.value)}
                className={`border rounded-[8px] px-[16px] py-[12px] h-[322px] w-full resize-none ${
                  contentError
                    ? "border-red-500 border-[2px]"
                    : "border-gray-300"
                }`}
                placeholder="내용을 입력해주세요."
              />
              <div
                className={`absolute bottom-6 right-6 text-sm text-[#5E616E] ${
                  contentError && "text-red-500"
                }`}
              >
                {content.length}/300
              </div>
            </div>
            {contentError && (
              <p className="text-red-500 text-sm text-[14px] font-semibold mt-1">
                {contentError}
              </p>
            )}
          </div>
        </div>

        <button
          disabled={isDisabled}
          type="submit"
          onClick={handleSubmit}
          className="text-white bg-gray-900 hover:bg-gray-800 active:bg-gray-700 disabled:bg-[#D6D7DC] font-semibold w-[200px] h-[59px] rounded-[12px]"
        >
          등록하기
        </button>
      </form>
    </DefaultLayout>
  );
}
