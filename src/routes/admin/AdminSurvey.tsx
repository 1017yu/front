import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
import SurveyItem from '@/components/admin/SurveyItem';
import IAdminSurvey from '@/types/IAdminSurvey';

const dummySurveyItems: IAdminSurvey[] = [
  {
    id: 1,
    title: '수요조사 1번',
    startDate: new Date(),
    endDate: new Date(),
    status: 'REVERT',
  },
  {
    id: 2,
    title: '수요조사 2번',
    startDate: new Date(),
    endDate: new Date(),
    status: 'INPROGRESS',
  },
];

const AdminSurvey = () => {
  return (
    <div className="flex h-screen w-full flex-col bg-gray-100 px-5 py-10">
      <h1 className="text-3xl font-medium">수요조사 관리</h1>
      <div className="h-9 w-[200px] self-end">
        <Link to="/admin/survey/detail">
          <Button contents={'수요조사 등록하기'} />
        </Link>
      </div>

      {/* 수요조사 목록 */}
      <ul className="mt-[70px] grid grid-cols-surveyItems gap-3 border-b border-subTextAndBorder bg-white">
        <li className="pl-10 text-lg leading-[56px]">제목</li>
        <li className="text-lg leading-[56px]">조사 시작일</li>
        <li className="text-lg leading-[56px]">조사 종료일</li>
        <li className="text-lg leading-[56px]">상태</li>
        <li className="mr-[10px] h-[56px] w-10"></li>
      </ul>

      <ul>
        {dummySurveyItems.map((item) => (
          <SurveyItem key={item.id} survey={item} />
        ))}
      </ul>
    </div>
  );
};

export default AdminSurvey;
