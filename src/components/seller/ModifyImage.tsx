import moment from 'moment';
import { useRecoilState } from 'recoil';
import Button from '@/components/ui/Button';
import { useModal } from '@/hooks/useModal';
import { modalData } from '@/data/modalData';
import { boardConfig } from '@/data/s3configs';
import { eventFormState } from '@/states/Events';
import ReactS3Client from 'react-aws-s3-typescript';
import React, { useState, useEffect, useCallback } from 'react';

interface IPostImage {
  value: string | null;
  label?: string;
}

export default function ModifyImage({ ...props }: IPostImage) {
  const { openModal } = useModal();
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [eventFormValue, setEventFormValue] = useRecoilState(eventFormState);

  const uploadImage = async (file: File) => {
    const s3 = new ReactS3Client(boardConfig);
    try {
      const fileName = `${moment().format('YYMMDDhh:mm:ss')}_${
        file.name.split('.')[0]
      }`;
      const res = await s3.uploadFile(file, fileName);
      setImageFile(null);

      // 업로드된 이미지의 URL을 thumbnailUrl에 설정
      setEventFormValue({
        ...eventFormValue,
        thumbnailUrl: res.location,
      });
    } catch (error) {
      // TODO: 파일 업로드 실패 예외처리
      console.log(error);
    }
  };

  useEffect(() => {
    if (imageFile !== null) {
      uploadImage(imageFile);
    }
  }, [imageFile]);

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file.size > 5000000) {
        // TODO 파일 사이즈 제한 예외처리
        return;
      }
      setImageFile(file);
    }
  };

  // 이미지 변경 버튼 핸들러
  const handleImageChange = useCallback(() => {
    openModal({
      ...modalData.SELLER_MODIFY_IMAGE,
      content: <img src={eventFormValue.thumbnailUrl} alt="Thumbnail" />,
      okCallback: () => {
        setIsChangeImage(true);
      },
    });
  }, [eventFormValue.thumbnailUrl, openModal]);

  return (
    <div className="sm:mb-4">
      <label
        className="text-xs text-subTextAndBorder sm:text-base"
        htmlFor={props.label}
      >
        {props.label}
      </label>
      <div className={`${isChangeImage ? 'hidden' : 'block'} max-w-[100px]`}>
        <Button contents={'변경하기'} onClick={handleImageChange} secondary />
      </div>

      <input
        className={`${
          isChangeImage ? 'block' : 'hidden'
        } flex h-10 w-full items-center rounded-md border-2 border-subTextAndBorder px-3 py-[7px] text-xs outline-none transition focus:border-accent disabled:cursor-not-allowed disabled:border-accent disabled:opacity-30 sm:h-12 sm:text-base`}
        type="file"
        accept="image/*"
        onChange={onChangeFile}
      />
    </div>
  );
}
