import React from 'react';
import NewComments from '@/components/community/NewComments';
import CommentItem from '@/components/community/CommentItem';
import IPostComments from '@/types/IPostComments';

type TCommentsProps = {
  TCommentsList: IPostComments[];
};

const Comments: React.FC<TCommentsProps> = ({ TCommentsList }) => {
  return (
    <div>
      <div
        className={
          'mx-auto pl-[15px] pr-[15px] pt-[10px] text-2xl sm:w-[540px] md:w-[700px] lg:w-[1024px] xl:w-[1024px]'
        }
      >
        <h1>{TCommentsList.length}개의 댓글</h1>
      </div>
      <div
        className={
          'mx-auto sm:w-[540px] md:w-[700px] lg:w-[1024px] xl:w-[1024px]'
        }
      >
        <NewComments />
      </div>
      <div className={'mb-[30px]'}>
        {TCommentsList.map((comment, index) => (
          <div
            className={
              'mx-auto mb-[10px] mt-[15px] rounded-md bg-white pb-[10px] pl-[15px] pr-[15px] pt-[10px] shadow-sm sm:w-[540px] md:w-[700px] lg:w-[1024px] xl:w-[1024px]'
            }
            key={index}
          >
            <CommentItem {...comment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
