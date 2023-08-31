import React from 'react';
import { timeFormatChange } from '@/utils/community/timeFormat';

type TPostDetailProps = {
  nickname: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};
const RenderHtml: React.FC<TPostDetailProps> = ({
  nickname,
  title,
  content,
  created_at,
  updated_at,
}) => {
  const stringDate =
    created_at === updated_at
      ? timeFormatChange(created_at)
      : timeFormatChange(updated_at) + ', 수정 됨';

  return (
    <>
      <div className="text-2xl font-bold sm:mb-2 sm:text-4xl">{title}</div>
      <span className="mr-2 font-bold">{nickname}</span>
      <span className="text-gray-400">{stringDate}</span>
      <div
        className="mx-auto rounded-md sm:my-16"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <hr />
    </>
  );
};
export default RenderHtml;
