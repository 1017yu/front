import { useCallback, useEffect, useState } from 'react';
import Container from '@/components/ui/Container';
import SurveyPopUp from '@/components/survey/SurveyPopUp';
import { fetchActiveSurvey } from '@/api/survey/surveyRequests';
import { ISurveyResponse } from '@/types/ISurvey';
import { useUser } from '@/hooks/useUser';
import moment from 'moment';

import ReactS3Client from 'react-aws-s3-typescript';
import { boardConfig } from '@/data/s3configs';

export default function Home() {
  const [activeSurvey, setActiveSurvey] = useState<ISurveyResponse | null>(
    null,
  );
  const closeTodayDate = localStorage.getItem('CloseTodayDate');
  const { user } = useUser();

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchActiveSurvey().then((res) => {
      setActiveSurvey(res.data);
    });
  }, []);

  const closeSurveyPopUp = useCallback(() => {
    setActiveSurvey(null);
  }, []);

  const uploadImage = async (file: File) => {
    const s3 = new ReactS3Client(boardConfig);
    try {
      const fileName = `${moment().format('YYMMDDhh:mm:ss')}_${
        file.name.split('.')[0]
      }`;
      const res = await s3.uploadFile(file, fileName);
      setImageFile(null);
      console.log(res.location);
    } catch (error) {
      // TODO : 파일 업로드 실패 예외처리
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

  return (
    <Container>
      <div>이메일 : {user?.email}</div>
      <div>닉네임 : {user?.nickname}</div>
      <div>프로필이미지url : {user?.profileImgUrl}</div>
      {/* 이미지 업로드 S3 테스트 */}
      <form>
        <input type="file" accept="image/*" onChange={onChangeFile} />
      </form>

      {/* {user?.accessToken} */}
      {activeSurvey &&
        !activeSurvey.isDone &&
        moment().format('YYYY-MM-DD') !== closeTodayDate && (
          <SurveyPopUp
            surveyData={activeSurvey}
            closePopUp={closeSurveyPopUp}
          />
        )}
    </Container>
  );
}
