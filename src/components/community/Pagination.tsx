import Pagination from 'react-js-pagination';

type handlePageChangeType = (page: number) => void;

interface PagenationPropType {
  page: number;
  totalPostCount: number;
  itemsCountPerPage: number;
  pageRangeDisplayed: number;
  onChange: handlePageChangeType;
}

export default function PaginationComponent({
  page,
  totalPostCount,
  itemsCountPerPage,
  pageRangeDisplayed,
  onChange,
}: PagenationPropType): JSX.Element {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={itemsCountPerPage}
      totalItemsCount={totalPostCount}
      pageRangeDisplayed={pageRangeDisplayed}
      onChange={onChange}
      nextPageText={'>'}
      prevPageText={'<'}
    />
  );
}
