import axiosInstance from "./api";

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    nickname: string;
  };
}

export const getCommentsByPostId = async (
  postId: string
): Promise<Comment[]> => {
  const response = await axiosInstance.get<Comment[]>(
    `/api/posts/${postId}/comments`
  );
  return response.data;
};
