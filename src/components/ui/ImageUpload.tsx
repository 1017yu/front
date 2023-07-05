/* eslint-disable no-unused-vars */

interface ImageUploadProps {
  image: string | null;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUpload({ image, handleChange }: ImageUploadProps) {
  return (
    <div className="flex w-32 justify-center rounded-md border-2 border-accent transition hover:shadow-md active:scale-95">
      <label className="flex cursor-pointer flex-col items-center rounded-lg   bg-white">
        <img
          src={image ?? '/dummy-profile.png'}
          alt="profile"
          className="m-6 h-20 w-20 rounded-full object-cover shadow-md"
        />
        <span className="p-2 text-sm text-subTextAndBorder">
          프로필 사진 선택
        </span>
        <input
          type="file"
          className="hidden"
          onChange={handleChange}
          accept="image/*"
        />
      </label>
    </div>
  );
}
