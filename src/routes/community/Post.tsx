import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RenderHtml from '@/components/community/RenderHtml';
import { useUser } from '@/hooks/useUser';
import { getPostDetail } from '@/api/community/getPostDetail';
import IPostDetail from '@/types/IPostDetail';

import Comments from '@/components/community/Comments';

const Post = () => {
  const [content, setContent] = useState<IPostDetail>() || null;
  const { user } = useUser();
  const config = {
    headers: {
      Authorization: 'Bearer ' + user?.accessToken,
    },
  };
  const { id } = useParams();
  const parsedId = id ? parseInt(id, 10) : undefined;

  useEffect(() => {
    if (parsedId !== undefined) {
      getPostDetail(parsedId).then((res) => {
        try {
          setContent(res.data);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }, []);

  useEffect(() => {
    console.log('content : ', content);
  }, [content]);

  return (
    <div>
      <div>
        <RenderHtml
          nickname={content?.nickname || ''}
          title={content?.title || ''}
          content={content?.content || ''}
          created_at={content?.createdAt || ''}
          updated_at={content?.updatedAt || ''}
        />
      </div>
      <div>
      <Comments TCommentsList={content?.comments || []} />
      </div>
    </div>
  );
};

export default Post;
