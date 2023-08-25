import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Types
import IPostListItem from '@/types/IPostListItem';

// Components
import Button from '@/components/ui/Button';
import PostItem from '@/components/community/PostItem';
import PaginationComponent from '@/components/community/Pagination';

import {
  ITEMS_COUNT_PER_COMMUNITY_PAGE,
  PAGE_RANGE_DISPLAY,
} from '@/data/constants';

const Community = (): JSX.Element => {
  const navigate = useNavigate();
  const [totalPost, setTotalPost] = useState();
  const [data, setData] = useState<IPostListItem[]>([]);
  const [page, setPage] = useState(1);

  const handlePageChange = (page: number) => {
    setPage(page);
    axios
      .get(`http://15.164.205.25:8080/api/board?page=${page - 1}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log('Error fetching data', error);
      });
  };

  useEffect(() => {
    const title = document.getElementsByTagName('title')[0];
    title.innerHTML = 'POPPLe - 회원 커뮤니티';
    axios
      .get('http://15.164.205.25:8080/api/board')
      .then((response) => {
        setData(response.data.data);
        setTotalPost(response.data.totalPosts);
      })
      .catch((error) => {
        console.log('Error fetching data', error);
      });
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
        {data.map((item) => (
          <PostItem key={item.id} data={item} />
        ))}
      </div>
      <div className={'mx-auto mt-[30px] flex justify-center md:w-[70%]'}>
        <PaginationComponent
          page={page}
          totalPostCount={totalPost || 0}
          itemsCountPerPage={ITEMS_COUNT_PER_COMMUNITY_PAGE}
          pageRangeDisplayed={PAGE_RANGE_DISPLAY}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Community;
