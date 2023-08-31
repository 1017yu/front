import { apiInstance } from '@/api/axios';

export const deleteComment = async (commentId: number) => {
  const response = await apiInstance.delete(`/board/comment/${commentId}`);
  return response.data;
};
