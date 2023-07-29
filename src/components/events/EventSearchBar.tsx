import { useRecoilState } from 'recoil';
import { Listbox } from '@headlessui/react';
import { AiOutlineDown } from 'react-icons/ai';
import { AdressState } from '@/states/AdressState';
import {
  EVENT_REGION_ITEMS,
  EVENT_STATE_ITEMS,
  EVENT_CATEGORY_ITEMS,
} from '@/data/address';

export default function EventSearchBar() {
  // 선택된 지역 state
  const [selected, setSelected] = useRecoilState(AdressState);

  // 선택된 지역에 따른 시-군-구 filtering
  const filteredStates = EVENT_STATE_ITEMS.filter(
    (state) => state[selected.region as string],
  );

  // region을 업데이트하기 위한 이벤트 핸들러
  const handleRegionChange = (value: string) => {
    setSelected((prev) => ({
      ...prev,
      region: Object.values<string>(value)[0],
    }));
  };

  // state를 업데이트하기 위한 이벤트 핸들러
  const handleStateChange = (value: string) => {
    setSelected((prev) => ({
      ...prev,
      state: Object.values<string>(value)[0],
    }));
  };

  // category를 업데이트하기 위한 이벤트 핸들러
  const handleCategoryChange = (value: string) => {
    setSelected((prev) => ({
      ...prev,
      category: Object.values<string>(value)[0],
    }));
  };

  return (
    <div className="ml-6 flex w-full gap-2 sm:ml-36 sm:gap-4">
      {/* 드롭다운 버튼 - region */}
      <Listbox value={selected.region} onChange={handleRegionChange}>
        <div className="relative mt-4 ">
          <Listbox.Button className="relative cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:w-[12rem] sm:text-sm">
            {/* 드롭다운 메뉴 이름 */}
            <span className="block truncate">{selected.region}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {/* 드롭다운 아이콘 */}
              <div
                className="max h-5 w-5 text-center text-xl text-gray-400"
                aria-hidden="true"
              >
                <AiOutlineDown />
              </div>
            </span>
          </Listbox.Button>

          {/* 드롭다운 목록 */}
          <Listbox.Options className="absolute z-10 mt-1 max-h-[25rem] w-[10rem] gap-2 overflow-auto bg-white py-1 text-center text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-full sm:text-sm">
            <div className=" grid grid-cols-2 rounded-lg">
              {EVENT_REGION_ITEMS.map((value, index) => (
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
                  {({ selected }) => (
                    <span
                      className={`block  ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {value.region}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </div>
          </Listbox.Options>
        </div>
      </Listbox>

      {/* 드롭다운 버튼 - state */}
      <Listbox value={selected.state} onChange={handleStateChange}>
        <div className="relative mt-4 ">
          <Listbox.Button className="relative cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:w-[12rem] sm:text-sm">
            <span className="block truncate">{selected.state}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {/* 드롭다운 아이콘 */}
              <div
                className="max h-5 w-5 text-center text-xl text-gray-400"
                aria-hidden="true"
              >
                <AiOutlineDown />
              </div>
            </span>
          </Listbox.Button>

          {/* 드롭다운 목록 */}
          <Listbox.Options className="absolute z-10 mt-1 max-h-[25rem] w-[10rem] gap-2 overflow-auto bg-white  py-1 text-center text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-full sm:text-sm">
            <div className=" grid grid-cols-2 rounded-lg">
              {filteredStates.map((value, index) => (
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
                  {({ selected }) => (
                    <span
                      className={`block  ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {Object.values(value)}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </div>
          </Listbox.Options>
        </div>
      </Listbox>

      {/* 드롭다운 버튼 - category */}
      <Listbox value={selected.category} onChange={handleCategoryChange}>
        <div className="relative mt-4 ">
          <Listbox.Button className="relative cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:w-[12rem] sm:text-sm">
            <span className="block truncate">{selected.category}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {/* 드롭다운 아이콘 */}
              <div
                className="max h-5 w-5 text-center text-xl text-gray-400"
                aria-hidden="true"
              >
                <AiOutlineDown />
              </div>
            </span>
          </Listbox.Button>

          {/* 드롭다운 목록 */}
          <Listbox.Options className="absolute z-10 mt-1 max-h-[25rem] w-[10rem] gap-2 overflow-auto bg-white py-1 text-center text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:w-full sm:text-sm">
            <div className=" grid grid-cols-2 rounded-lg">
              {EVENT_CATEGORY_ITEMS.map((value, index) => (
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
                  {({ selected }) => (
                    <span
                      className={`block  ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {Object.values(value)}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </div>
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
