import { apiInstance } from '@/api/axios';

export const editComment = async (commentId: number, content: string) => {
  const response = await apiInstance.patch(`/board/comment/${commentId}`, {
    content: content,
  });
  return response.data;
};
