import { eventData } from '@/data/constants';
import PostDropDown from '@/components/seller/PostDropdown';

export default function PostCategory() {
  return (
    <div className="flex flex-col rounded-md">
      <div className="min-w-[5rem] text-xs text-subTextAndBorder sm:min-w-[10rem] sm:text-base">
        {eventData.EVENT_POST_STORE.label.catergory}
      </div>
      <PostDropDown />
    </div>
  );
}
