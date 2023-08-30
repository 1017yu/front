import { apiInstance } from '@/api/axios';
import IResponse from '@/types/IResponse';
import { IPostRequest } from '@/types/IPost';
import IPostDetail from '@/types/IPostDetail';

export const createPost = async (
  post: IPostRequest,
): Promise<IResponse<IPostDetail>> => {
  const response = await apiInstance.post('/board/write', post);
  return response.data;
};
