import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RenderHtml from '@/components/community/RenderHtml';
import Button from '@/components/ui/Button';
import Comment from '@/components/community/Comment';
import Container from '@/components/ui/Container';
import { getPostDetail } from '@/api/community/getPostDetail';
import { deletePost } from '@/api/community/postRequests';
import IPostDetail from '@/types/IPostDetail';
import IErrorResponse from '@/types/IErrorResponse';
import { useRecoilValue } from 'recoil';
import { commentState } from '@/states/Community';
import { useModal } from '@/hooks/useModal';
import { useUser } from '@/hooks/useUser';
import { modalData } from '@/data/modalData';
import customToast from '@/utils/customToast';

const Post = () => {
  const [content, setContent] = useState<IPostDetail | null>(null);
  const { user } = useUser();
  const { id } = useParams();
  const commentValue = useRecoilValue(commentState);
  const { openModal } = useModal();
  const navigate = useNavigate();

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

  const handleFetchError = useCallback(
    (isTokenError: boolean) => {
      openModal({
        ...(isTokenError
          ? modalData.COMMUNITY_TOKEN_ERRROR
          : modalData.COMMUNITY_RESPONSE_ERRROR),
        cancelCallback: () => {
          navigate(-1);
        },
      });
    },
    [openModal, navigate],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Number(id)) {
          const res = await getPostDetail(Number(id));
          setContent(res.data);
        }
      } catch (error) {
        handleFetchError((error as IErrorResponse).errorCode === 401);
      }
    };

    fetchData();
  }, [id, setContent, commentValue.isUpdated, handleFetchError]);

  return (
    <Container>
      {content && (
        <>
          {isVisibleEdit && (
            <div className={'mb-5 flex w-[100%] justify-between'}>
              <div className={'mt-[60px] w-[150px]'}>
                <Button contents={'수정하기'} onClick={handleEditClick} />
              </div>
              <div className={'mt-[60px] w-[150px]'}>
                <Button contents={'삭제하기'} onClick={handleDeleteClick} />
              </div>
            </div>
          )}
          <div className="my-10 bg-white p-8">
            <RenderHtml
              nickname={content?.nickname ?? ''}
              title={content?.title ?? ''}
              content={content?.content ?? ''}
              created_at={content?.createdAt ?? ''}
              updated_at={content?.updatedAt ?? ''}
            />
            <Comment comments={content?.comments || []} id={content?.id} />
          </div>
        </>
      )}
    </Container>
  );
};

export default Post;
