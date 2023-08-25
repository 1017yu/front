import { useNavigate } from 'react-router-dom';
import IPostListItem from '@/types/IPostListItem';
import { timeFormatChange } from '../../utils/community/timeFormat';

type PostItemProp = {
  data: IPostListItem;
};

const PostItem = ({ data }: PostItemProp): JSX.Element => {
  const navigate = useNavigate();

  const createdAt = data.createdAt || new Date().getTime();
  const updatedAt = data.updatedAt || new Date().getTime();

  const stringDate: String =
    data.createdAt === data.updatedAt
      ? timeFormatChange(createdAt.toString())
      : timeFormatChange(updatedAt.toString()) + ', 수정 됨';

  const moveToPost = () => {
    navigate(`/community/${data.id}`);
  };

  return (
    <div
      onClick={moveToPost}
      className={
        'flex cursor-pointer items-center rounded-lg border bg-white p-[20px] shadow-sm transition-all hover:border-accent'
      }
    >
      <div>
        <img
          className={'mr-[20px] sm:w-[125px] md:w-[150px] lg:w-[200px]'}
          src="@/assets/popple.jpg"
        />
      </div>
      <div>
        <span className="text-xl">
          <p className={'inline text-xl font-thin'}>작성자 : </p>
          {data.nickname}
        </span>
        <p className={'mb-[10px] mt-[10px] text-5xl font-bold'}>{data.title}</p>
        <p className="mb-[10px] flex-nowrap text-xl">{data.content}</p>
        <p className="text-md">
          <i className="fa-regular fa-comment  mr-[5px] text-gray-600"></i>
          {data.commentCount}
        </p>
        <p className="text-md">
          <i className="fa-regular fa-clock mr-[5px] text-gray-600"></i>
          {stringDate}
        </p>
      </div>
    </div>
  );
};

export default PostItem;
