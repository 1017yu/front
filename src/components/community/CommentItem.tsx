import { timeFormatChange } from '@/utils/community/timeFormat';
import IPostComments from '@/types/IPostComments';
import Button from '@/components/ui/Button';
import { deleteComment } from '@/api/community/deleteComment';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { modalData } from '@/data/modalData';
import customToast from '@/utils/customToast';
import Textarea from './Textarea';
import { editComment } from '@/api/community/editComment';
import { useRecoilState } from 'recoil';
import { commentState } from '@/states/Community';

const CommentItem: React.FC<IPostComments> = ({
  content,
  createdAt,
  updatedAt,
  member,
  id,
}) => {
  const { openModal } = useModal();
  const [activeEdit, setActiveEdit] = useState(false);
  const [isWriter, setIsWriter] = useState(false);
  const [commentValue, setCommentValue] = useRecoilState(commentState);

  // 로컬스토리지에서 유저 Email GET
  useEffect(() => {
    const getUser = localStorage.getItem('user');
    if (getUser) {
      const userEmail = JSON.parse(getUser).email;
      member.email === userEmail ? setIsWriter(true) : '';
    }

    setCommentValue({ ...member, content });
  }, [content, member, member.email, setCommentValue]);

  // 댓글 삭제 핸들러 함수
  const handleDeleteHandler = async () => {
    try {
      openModal({
        ...modalData.COMMUNITY_DELETE_COMMENT,
        okCallback: async () => {
          await deleteComment(id);
          setCommentValue((prev) => ({
            ...prev,
            isUpdated: !prev.isUpdated,
          }));
          customToast('댓글이 삭제되었습니다.', 'success');
        },
      });
    } catch (error) {
      alert(error);
    }
  };

  // 댓글 수정 핸들러 함수
  const handleEditHandler = async () => {
    try {
      openModal({
        ...modalData.COMMUNITY_EDIT_COMMENT,
        okCallback: async () => {
          await editComment(id, commentValue.content);
          setCommentValue((prev) => ({
            ...prev,
            content: commentValue.content,
            isUpdated: !prev.isUpdated,
          }));
          handleChangeEditMode();
          customToast('댓글이 수정되었습니다.', 'success');
        },
      });
    } catch (error) {
      alert(error);
    }
  };

  // textarea input에 대한 콜백함수
  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setCommentValue({ ...commentValue, content: event.target.value });
    },
    [commentValue, setCommentValue],
  );

  // Edit 모드를 on-off
  const handleChangeEditMode = () => {
    setActiveEdit((prev) => !prev);
  };

  // Edit 모드면 Textarea를 렌더, 그렇지 않으면 댓글의 내용을 렌더
  const renderContent = () => {
    if (activeEdit) {
      return (
        <>
          <Textarea contents={commentValue.content} onChange={onInputChange} />
          <div className="flex max-w-[10rem] gap-2 pt-4">
            <Button contents={'수정'} onClick={handleEditHandler} />
            <Button
              contents={'취소'}
              onClick={handleChangeEditMode}
              secondary
            />
          </div>
        </>
      );
    }
    return content;
  };

  // Edit 모드가 아니고, 해당 댓글을 작성한 유저일 때 수정 버튼 렌더
  const renderButton = () => {
    if (!activeEdit && isWriter) {
      return (
        <div className="flex max-w-[10rem] gap-2 pb-4">
          <Button contents={'수정'} onClick={handleChangeEditMode} />
          <Button contents={'삭제'} onClick={handleDeleteHandler} secondary />
        </div>
      );
    }
  };

  return (
    <div className="block justify-between border-b px-1 py-4 sm:flex">
      <div className="w-full">
        <div className="font-bold">
          <div className="flex items-center">
            <img
              src={member.profileUrl}
              alt="profileImage"
              className="mr-2 h-12 w-12 rounded-full"
            />
            <div>
              {member.nickname}
              <div className="text-xs text-gray-400">
                {createdAt === updatedAt
                  ? timeFormatChange(createdAt)
                  : timeFormatChange(updatedAt) + ', 수정됨'}
              </div>
            </div>
          </div>
        </div>
        <div className="text-md py-4">{renderContent()}</div>
        <div className="text-xs text-gray-400">{renderButton()}</div>
      </div>
    </div>
  );
};

export default CommentItem;
