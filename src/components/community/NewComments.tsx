import React, { useState, ChangeEvent, useCallback } from 'react';
import Button from '@/components/ui/Button';

const NewComments = () => {
  const [content, setContent] = useState<string>('');
  const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }, []);
  const onClick = useCallback(() => {
    // API 호출 등의 동작을 수행
    console.log('댓글 작성 버튼이 클릭되었습니다.');
    console.log('댓글 내용:', content);
    // 댓글 작성 완료 후 content 값을 초기화
    setContent('');
  }, [content]);

  return (
    <div className={'mb-[30px] flex flex-col border-b-2 p-[10px] pt-[15px]'}>
      <textarea
        className={'mb-[15px] h-[100px] rounded-md p-[10px] focus:outline-none'}
        value={content}
        onChange={onChange}
        placeholder={'댓글을 작성하세요'}
      />
      <div className={'self-end'}>
        <Button contents={'댓글 작성'} onClick={onClick} />
      </div>
    </div>
  );
};

export default React.memo(NewComments);
