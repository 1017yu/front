import { ChangeEvent } from 'react';

interface TextareaProps {
  contents: string;
  onChange: any;
}

const Textarea: React.FC<TextareaProps> = ({ contents, onChange }) => {
  return (
    <textarea
      className="min-h-[8rem] w-full rounded-md border p-4 focus:outline-none"
      value={contents}
      onChange={onChange}
      placeholder="댓글을 작성하세요"
    />
  );
};

export default Textarea;
