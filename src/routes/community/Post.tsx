import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/ui/Button';
import RenderHtml from '@/components/community/RenderHtml';
import Comments from '@/components/community/Comments';
import { useUser } from '@/hooks/useUser';
import { useModal } from '@/hooks/useModal';
import { getPostDetail } from '@/api/community/getPostDetail';
import { deletePost } from '@/api/community/postRequests';
import IPostDetail from '@/types/IPostDetail';
import customToast from '@/utils/customToast';
import { modalData } from '@/data/modalData';

const Post = () => {
  const [content, setContent] = useState<IPostDetail | null>(null);
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();

  // 닉네임 말고 userEmail로 비교하는게 더 좋을 것 같음
  const isVisibleEdit = useMemo(
    () => user?.nickname === content?.nickname,
    [user, content],
  );

  const onDeletePost = useCallback(async () => {
    deletePost(Number(id)).then(
      () => {
        customToast('게시글을 삭제했습니다.', 'success');
        navigate(-1);
      },
      () => {
        customToast('게시글 삭제를 실패했습니다.', 'error');
      },
    );
  }, [id]);

  const handleEditClick = () => {
    navigate('/community/new', {
      state: {
        title: content?.title,
        content: content?.content,
        id: content?.id,
      },
    });
  };

  const handleDeleteClick = () => {
    openModal({ ...modalData.POST_DELETE_CONFIRM, okCallback: onDeletePost });
  };

  useEffect(() => {
    if (id) {
      getPostDetail(Number(id)).then((res) => {
        try {
          setContent(res.data);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    console.log('content : ', content);
  }, [content]);

  return (
    <div className="mx-5 mt-5 sm:mx-auto sm:w-[80%] sm:max-w-[1024px] ">
      {isVisibleEdit && (
        <div className={'flex w-[100%] justify-between'}>
          <div className={'mt-[60px] w-[150px]'}>
            <Button contents={'수정하기'} onClick={handleEditClick} />
          </div>
          <div className={'mt-[60px] w-[150px]'}>
            <Button contents={'삭제하기'} onClick={handleDeleteClick} />
          </div>
        </div>
      )}

      <div>
        <RenderHtml
          nickname={content?.nickname ?? ''}
          title={content?.title ?? ''}
          content={content?.content ?? ''}
          created_at={content?.createdAt ?? ''}
          updated_at={content?.updatedAt ?? ''}
        />
      </div>
      <div>
        <Comments TCommentsList={content?.comments || []} />
      </div>
    </div>
  );
};

export default Post;
