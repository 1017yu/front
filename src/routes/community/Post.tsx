import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RenderHtml from '@/components/community/RenderHtml';
import { useUser } from '@/hooks/useUser';
import { getPostDetail } from '@/api/community/getPostDetail';
import IPostDetail from '@/types/IPostDetail';

import Comments from '@/components/community/Comments';

const Post = () => {
  const [content, setContent] = useState<IPostDetail | null>(null);
  const { user } = useUser();
  const { id } = useParams();

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
    <div>
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
