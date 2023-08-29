import { useState, useRef, useCallback, ChangeEvent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { boardConfig } from '@/data/s3configs';
import Button from '@/components/ui/Button';
import customToast from '@/utils/customToast';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageResize } from 'quill-image-resize-module-ts';
import ReactS3Client from 'react-aws-s3-typescript';
import moment from 'moment';

Quill.register('modules/ImageResize', ImageResize);

const PostEditor = (): JSX.Element => {
  const navigate = useNavigate();
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<ReactQuill | null>(null);
  const [title, setTitle] = useState<string>('');
  const [editorContent, setEditorContent] = useState<string>('');

  const savePost = useCallback(() => {
    if (titleInputRef.current && titleInputRef.current.value === '') {
      titleInputRef.current.focus();
      customToast('제목을 입력해주세요.', 'error');
      return;
    } else if (contentRef.current && contentRef.current.value === '') {
      contentRef.current.focus();
      customToast('본문을 작성해주세요.', 'error');
    } else {
      navigate('/community', { replace: true });
    }
  }, []);

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
        // TODO 파일 사이즈 제한 예외처리
        return;
      }

      const s3 = new ReactS3Client(boardConfig);

      try {
        const fileName = `${moment().format('YYMMDDhh:mm:ss')}_${
          file.name.split('.')[0]
        }`;
        const res = await s3.uploadFile(file, fileName);

        console.log(res.location);

        const editor = contentRef.current.getEditor();
        const range = editor.getSelection();
        if (range) {
          editor.insertEmbed(range.index, 'image', res.location);
        }
      } catch (error) {
        console.log(error);
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
    console.log(value);
    setEditorContent(value);
  };

  return (
    <div
      className={
        'container my-5 rounded bg-white px-5 py-5 sm:mx-auto sm:w-[50%]'
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
      <div className={'mb-[15px] h-[10px] w-[350px] bg-gray-400'}></div>
      <ReactQuill
        ref={(ref) => {
          contentRef.current = ref;
        }}
        className={'h-[70vh]'}
        placeholder="여기에 내용을 입력하세요."
        value={editorContent}
        onChange={handleChangeContent}
        modules={modules}
        formats={formats}
        theme="snow"
      />
      <div className={'flex w-[100%] justify-between'}>
        <div className={'mt-[60px] w-[150px]'}>
          <Button contents={'뒤로가기'} onClick={cancelPost} />
        </div>
        <div className={'mt-[60px] w-[150px]'}>
          <Button contents={'작성하기'} onClick={savePost} />
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
