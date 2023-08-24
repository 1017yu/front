import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IDummyData_PostDetail from '@/types/IDummyData_PostDetail';
import IDummyData_Comments from '@/types/IDummyData_PostComments';
import RenderHtml from '@/components/community/RenderHtml';
import Comments from '@/components/community/Comments';
import { useUser } from '@/hooks/useUser';

import axios from 'axios';
import IPostDetail from '@/types/IPostDetail';

const Post = () => {
  const { user } = useUser();
  console.log(user);
  const config = {
    headers: {
      Authorization: 'Bearer ' + user?.accessToken,
    },
  };
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://15.164.205.25:8080/api/board/${id}`, config)
      .then((response) => {
        console.log(response.data);
        setContent(response.data.data);
      })
      .catch((error) => {
        console.log('Error fetching data', error);
      });
  }, []);

  const [content, setContent] = useState<IPostDetail>() || null;

  useEffect(() => {
    console.log('content : ', content);
  }, [content]);

  return (
    <div>
      {/* <div>
        <RenderHtml
          nickname={content?.nickname}
          title={content?.title}
          content={htmlString}
          created_at={DummyData.created_at}
          updated_at={DummyData.updated_at}
        />
      </div>
      <div>
        <Comments TCommentsList={DummyData.comments} />
      </div> */}
    </div>
  );
};

export default Post;
