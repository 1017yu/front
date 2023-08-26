import moment from 'moment';
import { useRecoilState } from 'recoil';
import { IDateValue } from '@/types/IDateValue';
import { eventFormState } from '@/states/Events';
import { eventData } from '@/data/constants';
import Datepicker from 'react-tailwindcss-datepicker';

export default function PostPeriod() {
  // 이벤트 등록 Recoil Atom
  const [eventFormValue, setEventFormValue] = useRecoilState(eventFormState);
  const today = new Date();

  // 시작일자와 종료일자를 등록 및 변경
  const handleDateChange = (event: IDateValue | null) => {
    if (event) {
      setEventFormValue({
        ...eventFormValue,
        startDate: moment(event.startDate).toISOString(),
        endDate: moment(event.endDate).toISOString(),
      });
    }
  };

  // 변경된 eventFormValue atom에서 시작일자와 종료일자 선언
  const dateValue = {
    startDate: eventFormValue.startDate,
    endDate: eventFormValue.endDate,
  };

  return (
    <label className="text-subTextAndBorder sm:text-base" htmlFor="date">
      {eventData.EVENT_POST_STORE.label.period}
      <Datepicker
        i18n={'ko'}
        inputClassName={
          'mt-1 h-12 w-full rounded-md border-2 border-subTextAndBorder px-3 py-2 text-xs outline-none transition focus:border-accent sm:h-12 sm:text-base'
        }
        primaryColor={'teal'}
        startFrom={today}
        value={dateValue}
        readOnly={true}
        onChange={handleDateChange}
        minDate={moment().add(1, 'day').toDate()}
      />
    </label>
  );
}
