import moment from 'moment';
import { useRecoilState } from 'recoil';
import { eventDirName, client } from '@/data/s3configs';
import { eventFormState } from '@/states/Events';
import customToast from '@/utils/customToast';
import React, { useState, useEffect } from 'react';
import { PutObjectCommand } from '@aws-sdk/client-s3';

interface IPostImage {
  value: string | null;
  label?: string;
}

export default function PostImage({ ...props }: IPostImage) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [eventFormValue, setEventFormValue] = useRecoilState(eventFormState);

  const uploadImage = async (file: File) => {
    try {
      const fileName = `${moment().format('YYMMDDhh:mm:ss')}_${
        file.name.split('.')[0]
      }`;
      const params = {
        Bucket: import.meta.env.VITE_BUCKET_NAME,
        Key: `${eventDirName}${fileName}`,
        Body: file,
      };

      const command = new PutObjectCommand(params);
      await client.send(command).then((res) => {
        if (res.$metadata.httpStatusCode === 200) {
          const url = `https://${
            import.meta.env.VITE_BUCKET_NAME
          }.s3.ap-northeast-2.amazonaws.com/${eventDirName}${fileName}`;

          setImageFile(null);
          // 업로드된 이미지의 URL을 thumbnailUrl에 설정
          setEventFormValue({
            ...eventFormValue,
            thumbnailUrl: url,
          });
        }
      });
    } catch (error) {
      customToast('이미지 업로드를 실패했어요😭', 'error');
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

  return (
    <div className="mb-2 flex flex-col sm:mb-4">
      <label
        className="text-xs text-subTextAndBorder sm:text-base"
        htmlFor={props.label}
      >
        {props.label}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onChangeFile}
        className="block h-10 w-full rounded-md border-2 border-subTextAndBorder px-3 py-[7px] text-xs outline-none transition focus:border-accent disabled:cursor-not-allowed disabled:border-accent  disabled:opacity-30 sm:h-12 sm:text-base"
      />
    </div>
  );
}
