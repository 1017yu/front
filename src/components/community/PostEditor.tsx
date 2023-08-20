import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';

//Editor 라이브러리인 ReactQuill import
import ReactQuill, { Quill } from 'react-quill';
// ReactQuill 기본 스타일링 CSS import
import 'react-quill/dist/quill.snow.css';
// ReactQuill 이미지 리사이징 모듈 import
// 에러는 뜨지만 import는 정상적으로 작동됌
import ImageResize from 'quill-image-resize';
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
      alert('제목을 작성해주세요.');
      return;
    } else if (contentRef.current && contentRef.current.value === '') {
      contentRef.current.focus();
      alert('본문을 작성해주세요.');
    } else {
      //데이터를 서버로 전송하기
      navigate('/community', { replace: true });
    }
  }, []);

  const cancelPost = useCallback(() => {
    navigate('/community');
  }, []);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
    history: {
      delay: 1000,
      maxStack: 500,
      userOnly: true,
    },
    ImageResize: {
      parchment: Quill.import('parchment'),
    },
  };
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

  return (
    <div className={'container mx-auto max-[640px]:w-[450px] sm:w-[80vh]'}>
      <input
        ref={titleInputRef}
        className={
          'mb-[8px] mt-[30px] w-[100%] text-5xl focus:border-none focus:outline-none'
        }
        type={'text'}
        value={title}
        placeholder="제목을 입력하세요."
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <div className={'mb-[15px] h-[10px] w-[350px] bg-gray-400'}></div>
      <ReactQuill
        ref={(ref) => {
          contentRef.current = ref;
        }}
        className={'h-[70vh]'}
        placeholder="여기에 내용을 입력하세요."
        value={editorContent}
        onChange={setEditorContent}
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

export default React.memo(PostEditor);
