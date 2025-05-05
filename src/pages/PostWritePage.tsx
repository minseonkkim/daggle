import { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { useAuthStore } from "../stores/authStore";
import { Navigate } from "react-router-dom";

export default function PostWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;

    if (title.trim().length < 1) {
      setTitleError("제목은 최소 1자 이상 입력해주세요.");
      valid = false;
    } else {
      setTitleError("");
    }

    if (content.trim().length < 5) {
      setContentError("내용은 최소 5자 이상 입력해주세요.");
      valid = false;
    } else {
      setContentError("");
    }

    if (!valid) return;
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
          type="submit"
          className="text-white bg-gray-900 hover:bg-gray-800 active:bg-gray-700 disabled:bg-[#D6D7DC] font-semibold w-[200px] h-[59px] rounded-[12px]"
        >
          등록하기
        </button>
      </form>
    </DefaultLayout>
  );
}
