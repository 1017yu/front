import { useRecoilState } from 'recoil';
import { Listbox } from '@headlessui/react';
import { IoIosArrowDown } from 'react-icons/io';
import { POST_CATERGORY } from '@/data/constants';
import { PostEventState } from '@/states/PostEventState';

export default function EventSearchBar() {
  // recoil state
  const [eventState, setEventState] = useRecoilState(PostEventState);

  // 행사 제목 핸들러
  const handleCategoryChange = (value: string) => {
    setEventState((prev) => ({
      ...prev,
      category: value,
    }));
  };

  return (
    <div className="container sm:mx-auto sm:flex">
      <div className="flex w-full items-center gap-2 align-middle sm:m-0 sm:gap-4">
        {/* 드롭다운 버튼 - region */}
        <Listbox value={eventState.category} onChange={handleCategoryChange}>
          <div className="relative w-full">
            <Listbox.Button className="relative w-full cursor-pointer rounded-md border-2 border-subTextAndBorder py-2 pl-3 pr-10 text-left focus:border-accent focus:outline-none sm:w-full sm:text-sm">
              {/* 드롭다운 메뉴 이름 */}
              <span className="block w-full truncate sm:w-full">
                {eventState.category}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                {/* 드롭다운 아이콘 */}
                <div className="absolute right-3 text-accent">
                  <IoIosArrowDown />
                </div>
              </span>
            </Listbox.Button>

            {/* 드롭다운 목록 */}
            <Listbox.Options className="absolute z-10 mt-1 max-h-[25rem] w-full gap-2 overflow-auto bg-white py-1 text-center text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-full sm:text-sm">
              <div className=" grid grid-cols-2 rounded-lg">
                {POST_CATERGORY.map((value, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative grid cursor-pointer select-none px-2 py-4 ${
                        active
                          ? 'rounded-lg bg-accent text-white'
                          : 'text-gray-900'
                      }`
                    }
                    value={value}
                  >
                    {({ active }) => (
                      <span
                        className={`block  ${
                          active ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {value}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </div>
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
    </div>
  );
}
