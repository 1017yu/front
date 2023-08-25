import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import Select from '@/components/ui/Select';
import { postEventState } from '@/states/Events';
import { ADRESS_SELECT_OPTIONS } from '@/data/constants';

export default function PostLocation() {
  // 이벤트 등록 Recoil Atom
  const [eventState, setEventState] = useRecoilState(postEventState);

  // 행사 위치 핸들러
  const handleLocationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setEventState({
      ...eventState,
      [name]: value,
    });
  };

  // 도시 선택
  const citySelectOptions = useMemo(
    () =>
      ADRESS_SELECT_OPTIONS.map((option) => ({
        name: option.city,
        value: option.city,
      })),
    [],
  );

  // 행정구 선택
  const districtSelectOptions = useMemo(() => {
    const selectedOption = ADRESS_SELECT_OPTIONS.find(
      (option) => option.city === eventState.city,
    );

    // 선택한 city에 대한 district 도출
    if (selectedOption) {
      return selectedOption.district.map((option) => ({
        name: option,
        value: option,
      }));
    } else {
      return [];
    }
  }, [eventState.city]);

  return (
    <div className="flex flex-col rounded-md">
      <div className="flex gap-2">
        <div className="flex-1">
          <Select
            name="city"
            label="도, 시*"
            onChange={handleLocationChange}
            options={[{ name: '도, 시', value: '' }, ...citySelectOptions]}
            value={eventState.city as string}
          />
        </div>
        <div className="flex-1">
          <Select
            disabled={!eventState.city}
            name="district"
            label="구, 군*"
            onChange={handleLocationChange}
            options={
              !eventState.city
                ? [{ name: '구, 군', value: '' }]
                : [
                    { name: '구, 군', value: '' },
                    ...(districtSelectOptions as {
                      name: string;
                      value: string;
                    }[]),
                  ]
            }
            value={eventState.district as string}
          />
        </div>
      </div>
    </div>
  );
}
