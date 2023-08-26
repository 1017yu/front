import { useMemo } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { searchOptionState } from '@/states/Events';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  ADRESS_SELECT_OPTIONS,
  EVENT_CATEGORY_OPTIONS,
} from '@/data/constants';

export default function EventSearchBar() {
  // 선택 옵션 recoil state를 모두 reset
  const resetList = useResetRecoilState(searchOptionState);

  // 선택된 옵션 recoil state
  const [searchOption, setSearchOption] = useRecoilState(searchOptionState);

  // 선택한 옵션 값 바꿔주는 함수
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSearchOption({
      ...searchOption,
      [name]: value,
    });
  };

  // 도시 옵션 선택
  const citySelectOptions = useMemo(
    () =>
      ADRESS_SELECT_OPTIONS.map((option) => ({
        name: option.city,
        value: option.city,
      })),
    [],
  );

  // 행정구 옵션 선택
  const districtSelectOptions = useMemo(() => {
    const selectedCityOption = ADRESS_SELECT_OPTIONS.find(
      (option) => option.city === searchOption.city,
    );

    if (selectedCityOption && selectedCityOption.district) {
      return selectedCityOption.district.map((district) => ({
        name: district,
        value: district,
      }));
    } else {
      return [];
    }
  }, [searchOption.city]);

  // 카테고리 옵션 선택
  const categorySelectOptions = useMemo(
    () =>
      EVENT_CATEGORY_OPTIONS.map((option) => ({
        name: option,
        value: option,
      })),
    [],
  );

  const handleResetOptions = () => {
    // Recoil 상태를 초기화하는 함수 호출
    resetList();
  };

  return (
    <div className="container mx-auto px-8 sm:mb-8 sm:flex sm:gap-4 sm:px-20">
      <div className="my-4 flex-1 sm:mt-4">
        <Select
          name="city"
          label="지역 선택"
          onChange={handleOptionChange}
          options={[{ name: '도, 시', value: '' }, ...citySelectOptions]}
          value={searchOption.city}
        />
      </div>
      <div className="my-4 flex-1 sm:mt-4">
        <Select
          disabled={!searchOption.city}
          name="district"
          label="행정구 선택"
          onChange={handleOptionChange}
          options={
            !searchOption.city
              ? [{ name: '구, 군', value: '' }]
              : [
                  { name: '구, 군', value: '' },
                  ...(districtSelectOptions as {
                    name: string;
                    value: string;
                  }[]),
                ]
          }
          value={searchOption.district}
        />
      </div>
      <div className="my-4 flex-1 sm:mt-4">
        <Select
          name="category"
          label="카테고리"
          onChange={handleOptionChange}
          options={[{ name: '카테고리', value: '' }, ...categorySelectOptions]}
          value={searchOption.category}
        />
      </div>

      <div className="my-4 flex flex-1 items-end sm:mt-4 sm:max-w-[8rem]">
        <Button
          contents={'옵션 초기화'}
          onClick={handleResetOptions}
          secondary
        />
      </div>
    </div>
  );
}
