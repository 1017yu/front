import React from 'react';
import { timeFormatChange } from '@/utils/community/timeFormat';
import IPostComments from '@/types/IPostComments';

const CommentItem: React.FC<IPostComments> = ({
  content,
  createdAt,
  updatedAt,
  id,
  member,
}) => {
  return (
    <div>
      <p className={'font-bold'}>{member.email}</p>
      <p className={'mb-[10px] mt-[10px]'}>{content}</p>
      <p className={'text-gray-400'}>
        {createdAt === updatedAt
          ? timeFormatChange(createdAt)
          : timeFormatChange(updatedAt) + ', 수정 됨'}
      </p>
    </div>
  );
};

export default CommentItem;
