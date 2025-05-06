## 프로젝트 설명
게시판 기능이 포함된 반응형 웹 애플리케이션입니다. 사용자는 로그인 후 게시글과 댓글을 작성하고, 수정·삭제할 수 있습니다.
사용자 경험을 높이기 위해 무한 스크롤, 입력 유효성 검사 등도 함께 구현했습니다.

배포 주소: https://daggle-mu.vercel.app

## 사용 기술
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"> <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white"> <img src="https://img.shields.io/badge/zustand-000000?style=for-the-badge&logo=&logoColor=white"> <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">

## 폴더 구조
```
│  App.css
│  App.tsx
│  index.css
│  main.tsx
│  vite-env.d.ts
├─apis
│      api.ts
│      auth.ts
│      comment.ts
│      post.ts
├─assets
├─components
│      Banner.tsx
│      BannerCarousel.tsx
│      DesktopOnlyHeader.tsx
│      Header.tsx
│      PostList.tsx
├─hooks
│      useInfiniteScroll.ts
├─layouts
│      DefaultLayout.tsx
├─pages
│      HomePage.tsx
│      LoginPage.tsx
│      PostDetailPage.tsx
│      PostWritePage.tsx
├─stores
│      authStore.ts
├─types
│      auth.ts
│      comment.ts
│      post.ts
└─utils
        date.ts
```

## 전달 사항
회원가입 id: minseon1234 <br/>
회원가입 pwd: minseon1234
