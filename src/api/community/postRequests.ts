import { apiInstance } from '@/api/axios';
import IResponse from '@/types/IResponse';
import { IPostRequest } from '@/types/IPost';
import IPostDetail from '@/types/IPostDetail';

// 글 작성
export const createPost = async (
  post: IPostRequest,
): Promise<IResponse<IPostDetail>> => {
  const response = await apiInstance.post('/board/write', post);
  return response.data;
};

// 글 삭제
export const deletePost = async (postId: number) => {
  const response = await apiInstance.delete(`/board/${postId}`);
  return response.data;
};
