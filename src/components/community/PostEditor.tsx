import {
  useState,
  useRef,
  useCallback,
  ChangeEvent,
  useMemo,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { boardConfig } from '@/data/s3configs';
import Button from '@/components/ui/Button';
import customToast from '@/utils/customToast';
import { createPost, editPost } from '@/api/community/postRequests';
import { useModal } from '@/hooks/useModal';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageResize } from 'quill-image-resize-module-ts';
import ReactS3Client from 'react-aws-s3-typescript';
import moment from 'moment';
import { modalData } from '@/data/modalData';

Quill.register('modules/ImageResize', ImageResize);

type PostEditorProps = {
  isEditMode: boolean;
  id?: number;
  postTitle?: string;
  postContent?: string;
};

const PostEditor = ({
  isEditMode = false,
  id,
  postTitle,
  postContent,
}: PostEditorProps): JSX.Element => {
  const navigate = useNavigate();
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<ReactQuill | null>(null);
  const [title, setTitle] = useState<string>('');
  const [editorContent, setEditorContent] = useState<string>('');
  const { openModal } = useModal();

  useEffect(() => {
    if (isEditMode && postTitle && postContent && id) {
      setTitle(postTitle);
      setEditorContent(postContent);
    }
  }, [isEditMode, postTitle, postContent, id]);

  const handleSaveNewPost = useCallback(async () => {
    createPost({
      title: title,
      content: editorContent,
    }).then(
      (res) => {
        navigate(`/community/${res.data.id}`, { replace: true });
      },
      () => {
        openModal(modalData.POST_CREATE_FAILUR);
      },
    );
  }, [title, editorContent, navigate, openModal]);

  const handleEditPost = useCallback(async () => {
    if (!id) {
      return;
    }

    editPost(id, {
      title: title,
      content: editorContent,
    }).then(
      (res) => {
        navigate(`/community/${res.data.id}`, { replace: true });
      },
      () => {
        openModal(modalData.POST_CREATE_FAILUR);
      },
    );
  }, [title, editorContent, navigate, openModal, id]);

  const savePost = useCallback(() => {
    if (title.trim() === '') {
      titleInputRef.current?.focus();
      customToast('제목을 입력해주세요.', 'error');
      return;
    }

    if (editorContent.trim() === '') {
      contentRef.current?.focus();
      customToast('본문을 작성해주세요.', 'error');
      return;
    }

    if (isEditMode) {
      openModal({ ...modalData.POST_EDIT_CONFIRM, okCallback: handleEditPost });
      return;
    }
    handleSaveNewPost();
  }, [title, editorContent, navigate, openModal]);

  const cancelPost = useCallback(() => {
    navigate(-1);
  }, []);

  const handleImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      //이미지를 담아 전송할 formData를 만든다
      const file = input.files?.[0];

      if (!file || file.size > 5000000 || !contentRef.current) {
        customToast('이미지 사이즈가 너무 커요🥲', 'error');
        return;
      }

      const s3 = new ReactS3Client(boardConfig);

      try {
        const fileName = `${moment().format('YYMMDDhh:mm:ss')}_${
          file.name.split('.')[0]
        }`;
        const res = await s3.uploadFile(file, fileName);

        const editor = contentRef.current.getEditor();
        const range = editor.getSelection();
        if (range) {
          editor.insertEmbed(range.index, 'image', res.location);
        }
      } catch (error) {
        customToast('이미지 업로드를 실패했어요😭', 'error');
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['clean'],
        ],
        handlers: {
          image: handleImage,
        },
      },
      clipboard: {
        matchVisual: false,
      },
      history: {
        delay: 1000,
        maxStack: 500,
        userOnly: true,
      },
      ImageResize: {
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
    };
  }, []);

  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'header',
    'link',
    'image',
    'list',
    'bullet',
    'ordered',
  ];

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (value: string) => {
    setEditorContent(value);
  };

  return (
    <div
      className={
        'mx-5 my-5 flex h-[80vh] max-w-[1020px] flex-col rounded bg-white px-5 py-5 sm:mx-auto sm:w-[80%]'
      }
    >
      <input
        ref={titleInputRef}
        className={
          'mb-[8px] mt-[30px] w-[100%] text-3xl focus:border-none focus:outline-none'
        }
        type={'text'}
        value={title}
        placeholder="제목을 입력하세요."
        onChange={handleChangeTitle}
      />
      <div className={'mb-[15px] h-[10px] w-[70%] bg-gray-400'}></div>
      <ReactQuill
        ref={(ref) => {
          contentRef.current = ref;
        }}
        className="mb-10 flex-grow"
        placeholder="여기에 내용을 입력하세요."
        value={editorContent}
        onChange={handleChangeContent}
        modules={modules}
        formats={formats}
        theme="snow"
      />
      <div className={'flex w-[100%] shrink-0 justify-between pt-10'}>
        <div className={'w-[150px]'}>
          <Button contents={'뒤로가기'} onClick={cancelPost} />
        </div>
        <div className={'w-[150px]'}>
          <Button contents={'작성하기'} onClick={savePost} />
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
