import { ITitle } from '@/types/ITitle';

export default function Title({ text, center }: ITitle) {
  return (
    <div
      className={`${center ? 'text-center' : 'text-left'} text-2xl font-bold`}
    >
      {text}
    </div>
  );
}
