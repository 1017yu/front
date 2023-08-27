/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useModal } from '@/hooks/useModal';
import { eventState } from '@/states/Event';
import { modalData } from '@/data/modalData';
import { fetchEvent } from '@/api/events/event';
import { eventFormState } from '@/states/Events';
import { participateState } from '@/states/Events';
import EventMap from '@/components/events/EventMap';
import { useNavigate, useParams } from 'react-router-dom';
import EventDetailBox from '@/components/events/EventDetailBox';
import EventDetailDesc from '@/components/events/EventDetailDesc';
import EventDetailSeller from '@/components/events/EventDetailSeller';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export default function EventDetail() {
  const { openModal } = useModal();
  const navigate = useNavigate();

  // 행사 id 값 선언
  const { id } = useParams();

  // 행사 참여 여부 recoil atom 구독
  const isParticipate = useRecoilValue(participateState);

  // 해당 이벤트 state
  const [eventData, setEventData] = useRecoilState(eventState);
  const setEventFormValue = useSetRecoilState(eventFormState);

  useEffect(() => {
    window.scroll(0, 0);

    // id 값이 존재할 때, fetchEvent
    if (id) {
      // id가 유효한 값일 때만 fetchEventData 실행
      const fetchEventData = async () => {
        try {
          const response = await fetchEvent(id);
          setEventData(response.data);
          setEventFormValue(response.data);
        } catch (error: any) {
          if (error.errorCode === 400) {
            openModal({
              ...modalData.EVENT_DETAIL_RESPONSE_ERROR,
              content: `${error.message}`,
              cancelCallback: () => {
                navigate(-1);
              },
            });
          } else {
            openModal({
              ...modalData.EVENT_DETAIL_RESPONSE_ERROR,
              cancelCallback: () => {
                navigate(-1);
              },
            });
          }
        }
      };
      fetchEventData();
    }
  }, [id, isParticipate, navigate, openModal, setEventData, setEventFormValue]);

  return (
    <div className="container mx-auto my-12 rounded-lg bg-white pb-16 drop-shadow-md sm:max-w-[1250px] sm:p-16">
      {eventData && id && (
        <>
          <EventDetailBox
            id={id}
            thumbnailUrl={eventData.thumbnailUrl}
            name={eventData.name}
            nickname={eventData.nickname}
            city={eventData.city}
            district={eventData.district}
            category={eventData.category}
            startDate={eventData.startDate}
            endDate={eventData.endDate}
            createdAt={eventData.createdAt}
            updatedAt={eventData.updatedAt}
            status={eventData.status}
            isOwner={eventData.isOwner}
            isParticipant={eventData.isParticipant}
            description={eventData.description}
          />
          <EventDetailDesc description={eventData.description} />
          <EventMap />
          <EventDetailSeller participants={eventData.participants} />
        </>
      )}
    </div>
  );
}
