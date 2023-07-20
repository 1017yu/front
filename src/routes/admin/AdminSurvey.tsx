import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import SurveyItem from '@/components/admin/SurveyItem';
import IAdminSurvey from '@/types/IAdminSurvey';
import { fetchAdminSurvey } from '@/api/admin/adminRequests';

const AdminSurvey = () => {
  const [surveyList, setSurveyList] = useState<IAdminSurvey[]>([]);

  useEffect(() => {
    try {
      fetchAdminSurvey().then((res) => {
        setSurveyList(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100 px-5 py-10">
      <h1 className="text-2xl font-bold">수요조사 관리</h1>
      <div className="h-9 w-[200px] self-end">
        <Link to="/admin/survey/detail">
          <Button contents={'수요조사 등록하기'} />
        </Link>
      </div>

      {/* 수요조사 목록 */}
      <ul className="mt-[70px] grid grid-cols-smSurveyItems gap-3 border-b border-subTextAndBorder bg-white sm:grid-cols-surveyItems">
        <li className="pl-5 text-sm leading-[56px] sm:pl-10 sm:text-base sm:leading-[56px]">
          제목
        </li>
        <li className="text-sm leading-[56px] sm:text-base sm:leading-[56px]">
          조사 시작일
        </li>
        <li className="text-sm leading-[56px] sm:text-base sm:leading-[56px]">
          조사 종료일
        </li>
        <li className="text-sm leading-[56px] sm:text-base sm:leading-[56px]">
          상태
        </li>
        <li className="mr-[10px] h-[56px] w-10"></li>
      </ul>

      <ul>
        {surveyList.map((item) => (
          <SurveyItem key={item.id} survey={item} />
        ))}
      </ul>
    </div>
  );
};

export default AdminSurvey;
