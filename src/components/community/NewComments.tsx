import Button from '@/components/ui/Button';
import { postComment } from '@/api/community/postComment';
import { useState, ChangeEvent, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { commentState } from '@/states/Community';
import { modalData } from '@/data/modalData';
import { useModal } from '@/hooks/useModal';
import customToast from '@/utils/customToast';

export default function NewComments({ id }: { id?: number }) {
  const [contentInput, setContentInput] = useState({ content: '' });
  const setCommentValue = useSetRecoilState(commentState);
  const { openModal } = useModal();

  const onChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setContentInput({ content: event.target.value });
  }, []);

  const onClick = useCallback(() => {
    if (id) {
      try {
        openModal({
          ...modalData.COMMUNITY_POST_COMMENT,
          okCallback: async () => {
            await postComment(id, contentInput);
            setCommentValue((prev) => ({
              ...prev,
              isDeleted: true,
            }));
            setContentInput({ content: '' });
            customToast('댓글이 등록되었습니다.', 'success');
          },
        });

        setCommentValue((prev) => ({ ...prev, isPosted: true }));
      } catch (error) {
        alert(error);
      }
      // API 호출 등의 동작을 수행
      // 댓글 작성 완료 후 content 값을 초기화
    }
  }, [contentInput, id, openModal, setCommentValue]);

  return (
    <div className="mb-8 flex flex-col rounded-md">
      <textarea
        className="min-h-[6rem] rounded-md border-2 p-4 focus:outline-none"
        value={contentInput.content}
        onChange={onChange}
        placeholder="댓글을 작성하세요"
      />
      <div className="mb-8 mt-8 self-end">
        <Button contents="댓글 작성" onClick={onClick} />
      </div>
      <hr />
    </div>
  );
}
