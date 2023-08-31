/* eslint-disable no-unused-vars */
interface BioTextareaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function BioTextarea({ value, onChange }: BioTextareaProps) {
  return (
    <textarea
      id="bio"
      name="bio"
      value={value}
      onChange={onChange}
      style={{ height: 'auto' }}
      placeholder="가게 소개"
      className="h-20 w-full resize-none rounded-md border-2 border-subTextAndBorder px-3 py-2 text-xs outline-none transition focus:border-accent disabled:cursor-not-allowed disabled:border-accent disabled:opacity-30 sm:h-12 sm:text-base"
    />
  );
}
