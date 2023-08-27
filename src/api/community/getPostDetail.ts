import { apiInstance } from '@/api/axios';
import IPostDetail from '@/types/IPostDetail';

interface IPostDetailResponse<T> {
  statusCode: number;
  data: T;
}

export const getPostDetail = async (
  id: number,
): Promise<IPostDetailResponse<IPostDetail>> => {
  const response = await apiInstance.get(`/board/${id}`);
  return response.data;
};
