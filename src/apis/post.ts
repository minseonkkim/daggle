import {
  CreatePostRequest,
  PostDetail,
  PostsResponse,
  UpdatePostRequest,
} from "../types/post";
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

export const createPost = async (
  data: CreatePostRequest
): Promise<PostDetail> => {
  const response = await axiosInstance.post<PostDetail>("/api/posts", data);
  return response.data;
};

export const updatePostById = async (
  id: string,
  data: UpdatePostRequest
): Promise<PostDetail> => {
  const response = await axiosInstance.patch<PostDetail>(
    `/api/posts/${id}`,
    data
  );
  return response.data;
};

export const deletePostById = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/api/posts/${id}`);
};
