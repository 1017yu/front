import { useLocation } from 'react-router-dom';
import PostEditor from '@/components/community/PostEditor';

const NewPost = (): JSX.Element => {
  const { title, content, id } = useLocation().state;

  return (
    <div>
      <PostEditor
        isEditMode={title !== null && content !== null && id !== null}
        postTitle={title}
        postContent={content}
        id={Number(id)}
      />
    </div>
  );
};
export default NewPost;
