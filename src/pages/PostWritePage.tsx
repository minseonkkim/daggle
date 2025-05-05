import DefaultLayout from "../layouts/DefaultLayout";

export default function PostWritePage() {
  return (
    <DefaultLayout>
      <div className="font-pretendard flex flex-col items-center">
        <div className="flex flex-col bg-white w-full md:p-[24px] gap-[24px] md:rounded-[12px] my-6 md:border-[1px] border-gray-200 overflow-hidden">
          <h1 className="font-bold text-[20px]">게시글 작성</h1>
          <input
            className="border rounded-[8px] px-[16px] py-[12px]"
            placeholder="제목을 입력해주세요."
          />
          <textarea
            className="border rounded-[8px] px-[16px] py-[12px] h-[322px]"
            placeholder="내용을 입력해주세요."
          />
        </div>
        <button className="text-white bg-gray-900 hover:bg-gray-800 active:bg-gray-700 disabled:bg-[#D6D7DC] font-semibold w-[200px] h-[59px] rounded-[12px]">
          등록하기
        </button>
      </div>
    </DefaultLayout>
  );
}
