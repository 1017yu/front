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
  const stringDate: String =
    created_at === updated_at
      ? timeFormatChange(created_at)
      : timeFormatChange(updated_at) + ', 수정 됨';

  return (
    <div>
      <div
        className={
          'mx-auto mt-[30px] rounded-md bg-white pb-[10px] pl-[15px] pr-[15px] pt-[10px] shadow-sm sm:w-[540px] md:w-[700px] lg:w-[1024px] xl:w-[1024px]'
        }
      >
        <div className={'pb-[5px] pr-[10px] pt-[15px] text-4xl font-bold'}>
          {title}
        </div>
        <div className={'pb-[5px]'}>
          <p>
            <span className={'font-bold'}>{nickname}</span> ·{' '}
            <span className={'  text-gray-400'}>{stringDate}</span>
          </p>
        </div>
      </div>
      <div
        className={
          'mx-auto mb-[30px] mt-[15px] rounded-md bg-white pb-[10px] pl-[15px] pr-[15px] pt-[10px] shadow-sm sm:w-[540px] md:w-[700px] lg:w-[1024px] xl:w-[1024px]'
        }
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};
export default RenderHtml;
