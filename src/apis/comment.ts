import { Comment } from "../types/comment";
import axiosInstance from "./api";

export const getCommentsByPostId = async (
  postId: string
): Promise<Comment[]> => {
  const response = await axiosInstance.get<Comment[]>(
    `/api/posts/${postId}/comments`
  );
  return response.data;
};
