import { eventData } from '@/data/constants';

interface IStatusProps {
  status?: string;
}

export default function Status({ status }: IStatusProps) {
  // 행사 status color 변수 선언
  let statusClass = '';

  // 행사 status text 변수 선언
  let statusText = '';

  // 행사 status가 시작 전일 때
  if (status === eventData.EVENT_STATUS_READY.title) {
    statusClass = eventData.EVENT_STATUS_READY.color;
    statusText = eventData.EVENT_STATUS_READY.title;

    // 행사 status가 진행중일 때
  } else if (status === eventData.EVENT_STATUS_INPROGRESS.title) {
    statusClass = eventData.EVENT_STATUS_INPROGRESS.color;
    statusText = eventData.EVENT_STATUS_INPROGRESS.title;

    // 행사 status가 마감일 때
  } else {
    statusClass = eventData.EVENT_STATUS_DONE.color;
    statusText = eventData.EVENT_STATUS_DONE.title;
  }

  return (
    <div
      className={`text-whie mb-2 mt-6 flex h-10 w-[7rem] sm:w-[10rem] items-center rounded-3xl text-sm text-white sm:mb-2 sm:mt-6 sm:h-12 ${statusClass}`}
    >
      <div
        className={`mx-4 sm:mx-5 h-4 w-4 sm:w-6 rounded-full sm:h-6 ${statusClass} brightness-75`}
       />
      <div className="text-base sm:text-xl lg:text-2xl sm:mb-1 font-light">{statusText}</div>
    </div>
  );
}
