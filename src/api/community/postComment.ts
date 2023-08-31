import { apiInstance } from '@/api/axios';

export const postComment = async (postId: number, content: string) => {
  const response = await apiInstance.post(`/board/${postId}/comment`, {
    content: content,
  });
  return response.data;
};
