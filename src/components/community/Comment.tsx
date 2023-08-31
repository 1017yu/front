import NewComments from '@/components/community/NewComments';
import CommentItem from '@/components/community/CommentItem';
import { IComments } from '@/types/IPostComments';

export default function Comment({ comments, id }: IComments) {
  return (
    <>
      <div className="mb-4 mt-16 text-base sm:text-xl">
        <h1>{comments.length}개의 댓글</h1>
      </div>
      <NewComments id={id} />
      <div className="mb-8 rounded-md bg-white px-8 shadow-md ">
        {comments.map((comment, index) => (
          <div className="mx-auto rounded-md" key={index}>
            <CommentItem {...comment} />
          </div>
        ))}
      </div>
    </>
  );
}
