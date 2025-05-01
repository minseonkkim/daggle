export default function LoginPage() {
  return (
    <div className="flex flex-col md:items-center md:justify-center min-h-[calc(100vh-86px)]">
      <form
        // onSubmit={}
        className="bg-white md:p-8 mt-8 md:mt-0 md:rounded md:shadow-md w-full max-w-md md:rounded-[12px]"
      >
        <h1 className="font-pretendard text-2xl font-bold leading-[1.6] mb-1">
          안녕하세요
          <br />
          <span className="text-[#320397]">한다글다글</span>
          입니다.
        </h1>
        <p className="font-pretendard font-semibold text-gray-400 mb-4">
          로그인을 통해 더 많은 기능을 이용하세요
        </p>
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          //   value={}
          //   onChange={(e) => setId(e.target.value)}
          className="border px-[16px] py-[12px] w-full mb-3 rounded-[8px]"
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          //   value={password}
          //   onChange={(e) => setPassword(e.target.value)}
          className="border px-[16px] py-[12px] w-full mb-3 rounded-[8px]"
        />
        {/* {error && <p className="text-red-500 text-sm mb-2">{error}</p>} */}
        <button
          type="submit"
          className="bg-gray-900 font-semibold text-white rounded-[12px] px-[24px] py-[16px] mt-3 w-full rounded"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
