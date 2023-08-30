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
  const stringDate: string =
    created_at === updated_at
      ? timeFormatChange(created_at)
      : timeFormatChange(updated_at) + ', 수정 됨';

  return (
    <div>
      <div className="mt-[30px] w-full rounded-md bg-white p-5 shadow-sm">
        <div className="text-4xl font-bold">{title}</div>
        <div className="pt-4">
          <p>
            <span className={'font-bold'}>{nickname}</span> ·{' '}
            <span className={'text-gray-400'}>{stringDate}</span>
          </p>
        </div>
      </div>
      <div
        className={'mx-auto mb-6 mt-5 w-full rounded-md bg-white p-5 shadow-sm'}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};
export default RenderHtml;
