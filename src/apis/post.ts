import { PostDetail, PostsResponse } from "../types/post";
import axiosInstance from "./api";

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
