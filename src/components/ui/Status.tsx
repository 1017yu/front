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
      className={`text-whie mb-2 mt-6 flex h-10 items-center rounded-3xl text-sm text-white sm:mb-4 sm:mt-6 sm:h-12 ${statusClass}`}
    >
      <div
        className={`ml-6 mr-5 h-4 w-4 rounded-full sm:ml-5 sm:mr-4 sm:h-6 sm:w-6  xl:mr-8 ${statusClass} brightness-150`}
      ></div>
      <div className="text-base sm:text-2xl">{statusText}</div>
    </div>
  );
}
