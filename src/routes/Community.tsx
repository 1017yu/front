import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IDummyData_PostList from '@/types/IDummyData_PostList';
import Button from '@/components/ui/Button';
import PostItem from '@/components/community/PostItem';
import PaginationComponent from '@/components/community/Pagination';
import {
  ITEMS_COUNT_PER_COMMUNITY_PAGE,
  PAGE_RANGE_DISPLAY,
} from '@/data/constants';

const Community = (): JSX.Element => {
  const navigate = useNavigate();
  const totalPostCount: number = 100;
  const dummyData: IDummyData_PostList[] = [
    {
      id: 1,
      nickname: 'guest1',
      title: 'Title1',
      content: 'Summary of the content...',
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
      commentCount: 1,
    },
    {
      id: 2,
      nickname: 'guest2',
      title: 'Title2',
      content: 'Summary of the content...',
      createdAt: new Date().getTime() + 1000000,
      updatedAt: new Date().getTime() + 1000000,
      commentCount: 3,
    },
    {
      id: 3,
      nickname: 'guest3',
      title: 'Title3',
      content: 'Summary of the content...',
      createdAt: new Date().getTime() + 2220000,
      updatedAt: new Date().getTime() + 2220000,
      commentCount: 2,
    },
    {
      id: 4,
      nickname: 'guest4',
      title: 'Title4',
      content: 'Summary of the content...',
      createdAt: new Date().getTime() + 3000000,
      updatedAt: new Date().getTime() + 3000000,
      commentCount: 5,
    },
    {
      id: 5,
      nickname: 'guest5',
      title: 'Title5',
      content: 'Summary of the content...',
      createdAt: new Date().getTime() + 3500000,
      updatedAt: new Date().getTime() + 3500000,
      commentCount: 3,
    },
    {
      id: 6,
      nickname: 'guest6',
      title: 'Title6',
      content: 'Summary of the content...',
      createdAt: new Date().getTime() + 5000000,
      updatedAt: new Date().getTime() + 7000000,
      commentCount: 2,
    },
    {
      id: 7,
      nickname: 'guest7',
      title: 'Title7',
      content: 'Summary of the content...',
      createdAt: new Date().getTime() + 6000000,
      updatedAt: new Date().getTime() + 6000000,
      commentCount: 2,
    },
    {
      id: 8,
      nickname: 'guest8',
      title: 'Title8',
      content: 'Summary of the content...',
      createdAt: new Date().getTime() + 7000000,
      updatedAt: new Date().getTime() + 7000000,
      commentCount: 2,
    },
    {
      id: 9,
      nickname: 'guest9',
      title: 'Title9',
      content: 'Summary of the content...',
      createdAt: new Date().getTime() + 8000000,
      updatedAt: new Date().getTime() + 8000000,
      commentCount: 2,
    },
    {
      id: 10,
      nickname: 'guest10',
      title: 'Title10',
      content: 'Summary of the content...',
      createdAt: new Date().getTime() + 9000000,
      updatedAt: new Date().getTime() + 9000000,
      commentCount: 2,
    },
    {
      id: 11,
      nickname: 'guest11',
      title: 'Title11',
      content: 'Summary of the content...',
      createdAt: new Date().getTime() + 10000000,
      updatedAt: new Date().getTime() + 10000000,
      commentCount: 2,
    },
    {
      id: 12,
      nickname: 'guest12',
      title: 'Title12',
      content: 'Summary of the content...',
      createdAt: new Date().getTime() + 11000000,
      updatedAt: new Date().getTime() + 11000000,
      commentCount: 2,
    },
  ];
  const [data, setData] = useState(dummyData);
  const [page, setPage] = useState(1);
  const handlePageChange = (page: number) => {
    setPage(page);
    console.log(page);
    // page를 쿼리로 API 호출한 후
    // setData()에다가 넣기
  };

  useEffect(() => {
    const title = document.getElementsByTagName('title')[0];
    title.innerHTML = 'POPPLe - 회원 커뮤니티';
  }, []);

  return (
    <div
      className={
        'mx-auto mb-[35px] mt-[35px] rounded-md bg-white pb-[35px] pl-[35px] pr-[35px] shadow-sm sm:w-[540px] md:w-[700px] lg:w-[1024px] xl:w-[1024px]'
      }
    >
      <div className={'flex items-center justify-between  pb-[35px] pt-[35px]'}>
        <h1 className={'text-[40px] font-thin'}>전체 글</h1>
        <div className={'w-36'}>
          <Button
            contents={'새 글 작성'}
            onClick={() => {
              navigate('/community/new');
            }}
          />
        </div>
      </div>
      <div className={'flex flex-col gap-10'}>
        {data.map((item, index) => (
          <PostItem key={index} data={item} />
        ))}
      </div>
      <div className={'mx-auto mt-[30px] flex justify-center md:w-[70%]'}>
        <PaginationComponent
          page={page}
          totalPostCount={totalPostCount}
          itemsCountPerPage={ITEMS_COUNT_PER_COMMUNITY_PAGE}
          pageRangeDisplayed={PAGE_RANGE_DISPLAY}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Community;
