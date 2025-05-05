import {
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
} from "../types/comment";
import axiosInstance from "./api";

export const getCommentsByPostId = async (
  postId: string
): Promise<Comment[]> => {
  const response = await axiosInstance.get<Comment[]>(
    `/api/posts/${postId}/comments`
  );
  return response.data;
};

export const createComment = async (
  postId: string,
  data: CreateCommentRequest
): Promise<Comment> => {
  const response = await axiosInstance.post<Comment>(
    `/api/posts/${postId}/comments`,
    data
  );
  return response.data;
};

export const updateComment = async (
  postId: string,
  commentId: string,
  data: UpdateCommentRequest
): Promise<Comment> => {
  const response = await axiosInstance.patch<Comment>(
    `/api/posts/${postId}/comments/${commentId}`,
    data
  );
  return response.data;
};

export const deleteComment = async (
  postId: string,
  commentId: string
): Promise<void> => {
  await axiosInstance.delete(`/api/posts/${postId}/comments/${commentId}`);
};
