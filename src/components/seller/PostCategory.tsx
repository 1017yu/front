import { POST_INPUT_TITLE } from '@/data/constants';
import PostDropDown from '@/components/seller/PostDropdown';

export default function PostCategory() {
  return (
    <div className="flex flex-col rounded-md">
      <div className="min-w-[5rem] text-xs text-subTextAndBorder sm:min-w-[10rem] sm:text-base">
        {POST_INPUT_TITLE.catergory}
      </div>
      <PostDropDown />
    </div>
  );
}
