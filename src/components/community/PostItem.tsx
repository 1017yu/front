import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import IPostListItem from '@/types/IPostListItem';
import { timeFormatChange } from '@/utils/community/timeFormat';
import popple from '@/assets/popple.jpg';

type PostItemProp = {
  data: IPostListItem;
};

const PostItem = ({ data }: PostItemProp): JSX.Element => {
  const navigate = useNavigate();

  const createdAt = data.createdAt || new Date().getTime();
  const updatedAt = data.updatedAt || new Date().getTime();

  const stringDate: string =
    data.createdAt === data.updatedAt
      ? timeFormatChange(createdAt.toString())
      : timeFormatChange(updatedAt.toString()) + ', 수정 됨';

  const moveToPost = () => {
    navigate(`/community/${data.id}`);
  };

  const thumbnailImage = useMemo(() => {
    const url = data.content.match(/https?:\/\/[^"]*/);
    return url ? url[0] : popple;
  }, [data]);

  return (
    <div
      onClick={moveToPost}
      className={
        'flex cursor-pointer items-center rounded-lg border bg-white p-[20px] shadow-sm transition-all hover:border-accent'
      }
    >
      <div className="mr-[20px] flex h-[125px] w-[125px] flex-shrink-0 items-center justify-center overflow-hidden rounded-md sm:h-[150px] sm:w-[150px]">
        <img className={'w-full'} src={thumbnailImage} />
      </div>

      <div className="overflow-hidden">
        <span className="text-xl">
          <p className={'inline text-xl font-thin'}>작성자 : </p>
          {data.nickname}
        </span>
        <p
          className={
            'mb-[10px] mt-[10px] w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold sm:text-4xl md:text-2xl'
          }
        >
          {data.title}
        </p>
        {/* <p className="mb-[10px] flex-nowrap text-xl">{data.content}</p> */}
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
