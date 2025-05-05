export interface Post {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  viewCount: number;
  commentCount: number;
  isAuthor: boolean;
}

export interface PostsResponse {
  items: Post[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  };
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

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
}
