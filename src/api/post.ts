import axiosInstance from "./api";

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

export const getPosts = async (
  page: number,
  limit: number
): Promise<PostsResponse> => {
  const response = await axiosInstance.get<PostsResponse>("/api/posts", {
    params: { page, limit },
  });
  return response.data;
};

export const getPostById = async (id: string): Promise<PostDetail> => {
  const response = await axiosInstance.get<PostDetail>(`/api/posts/${id}`);
  return response.data;
};
