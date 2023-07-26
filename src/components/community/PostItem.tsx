import { useNavigate } from 'react-router-dom';
import IDummyData from '@/types/IDummyData_PostList';

type PostItemProp = {
  data: IDummyData;
};

const PostItem = ({ data }: PostItemProp): JSX.Element => {
  const navigate = useNavigate();
  const stringDate: String =
    data.createdAt === data.updatedAt
      ? new Date(data.createdAt).toLocaleString()
      : new Date(data.updatedAt).toLocaleString() + ' 수정';

  const moveToPost = () => {
    navigate(`/community/${data.id}`);
  };

  return (
    <div
      onClick={moveToPost}
      className={
        'flex cursor-pointer items-center rounded-lg border p-[20px] hover:border-accent'
      }
    >
      <div>
        <img
          className={'mr-[20px] sm:w-[125px] md:w-[150px] lg:w-[200px]'}
          src="../../public/popple.jpg"
        />
      </div>
      <div>
        <p className="text-xl font-thin">{data.nickname}</p>
        <p className={'mb-[10px] mt-[10px] text-5xl font-bold'}>{data.title}</p>
        <p className="text-xl font-thin">{data.content}</p>
        <p className="text-xl font-thin italic">{stringDate}</p>
      </div>
    </div>
  );
};

export default PostItem;
