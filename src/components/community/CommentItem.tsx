import React from 'react';
import IDummyData_Comments from '@/types/IDummyData_PostComments';
import { timeFormatChange } from '@/utils/community/timeFormat';
import { create } from 'domain';

const CommentItem: React.FC<IDummyData_Comments> = ({
  nickname,
  content,
  created_at,
  updated_at,
}) => {
  return (
    <div>
      <p className={'font-bold'}>{nickname}</p>
      <p className={'mb-[10px] mt-[10px]'}>{content}</p>
      <p className={'text-gray-400'}>
        {created_at === updated_at
          ? timeFormatChange(created_at)
          : timeFormatChange(updated_at) + ', 수정 됨'}
      </p>
    </div>
  );
};

export default CommentItem;
