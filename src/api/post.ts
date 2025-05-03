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

export const getPosts = async (
  page: number,
  limit: number
): Promise<PostsResponse> => {
  const response = await axiosInstance.get<PostsResponse>("/api/posts", {
    params: { page, limit },
  });
  return response.data;
};
