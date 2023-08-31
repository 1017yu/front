import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RenderHtml from '@/components/community/RenderHtml';
import { getPostDetail } from '@/api/community/getPostDetail';
import IPostDetail from '@/types/IPostDetail';
import Comment from '@/components/community/Comment';
import Container from '@/components/ui/Container';
import { useRecoilValue } from 'recoil';
import { commentState } from '@/states/Community';
import { useModal } from '@/hooks/useModal';
import { modalData } from '@/data/modalData';

const Post = () => {
  const [content, setContent] = useState<IPostDetail>() || null;
  const { id } = useParams();
  const parsedId = id && parseInt(id, 10);
  const commentValue = useRecoilValue(commentState);
  const { openModal } = useModal();
  const navigator = useNavigate();

  useEffect(() => {
    if (parsedId) {
      getPostDetail(parsedId).then((res) => {
        try {
          setContent(res.data);
        } catch (error) {
          // TOFIXED:  현재 존재하지 않는 게시글 조회 시 500 INTERNAL ERROR를 반환해서, 에러 처리가 안되는 듯.
          openModal({
            ...modalData.COMMUNITY_RESPONSE_ERRROR,
            cancelCallback: () => {
              navigator(-1);
            },
          });
        }
      });
    }
  }, [
    parsedId,
    setContent,
    commentValue.isEdited,
    commentValue.isDeleted,
    commentValue.isPosted,
    openModal,
    navigator,
  ]);

  return (
    <Container>
      <div className="bg-white p-8">
        <RenderHtml
          nickname={content?.nickname || ''}
          title={content?.title || ''}
          content={content?.content || ''}
          created_at={content?.createdAt || ''}
          updated_at={content?.updatedAt || ''}
        />
        <Comment comments={content?.comments || []} id={content?.id} />
      </div>
    </Container>
  );
};

export default Post;
