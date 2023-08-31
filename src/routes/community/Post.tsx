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
    const fetchData = async () => {
      try {
        if (parsedId) {
          const res = await getPostDetail(parsedId);
          setContent(res.data);
        }
      } catch (error) {
        openModal({
          ...modalData.COMMUNITY_RESPONSE_ERRROR,
          cancelCallback: () => {
            navigator(-1);
          },
        });
      }
    };

    fetchData();
  }, [
    parsedId,
    setContent,
    commentValue.isEdited,
    commentValue.isDeleted,
    commentValue.isPosted,
    navigator,
    openModal,
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
