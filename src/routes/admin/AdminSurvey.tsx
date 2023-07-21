import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import SurveyItem from '@/components/admin/SurveyItem';
import IAdminSurvey from '@/types/IAdminSurvey';
import { fetchAdminSurvey, deleteAdminSurvey } from '@/api/admin/adminRequests';
import { useModal } from '@/hooks/useModal';
import { modalData } from '@/data/modalData';
const AdminSurvey = () => {
  const navigate = useNavigate();
  const [surveyList, setSurveyList] = useState<IAdminSurvey[]>([]);
  const [openMenuID, setOpenMenuID] = useState<number | null>(null);
  const { openModal } = useModal();

  // 수요조사 삭제 모달 + 삭제처리
  const openDeleteModal = useCallback(
    (surveyId: number) => {
      openModal({
        ...modalData.ADMIN_SURVEY_DELETE_CONFIRM,
        okCallback: () => {
          deleteAdminSurvey(surveyId).then(
            () => {
              getSurveyList();
            },
            (error) => {
              openModal({
                ...modalData.ADMIN_RESPONSE_ERROR,
                content: `${error.errorCode} ${error.message}`,
              });
            },
          );
        },
      });
    },
    [openModal],
  );

  // 드롭다운 메뉴 닫기
  const closeMenu = useCallback(() => {
    setOpenMenuID(null);
  }, []);

  // 드롭다운 메뉴 오픈
  const onClickMore = useCallback((id: number) => {
    setOpenMenuID(id);
  }, []);

  // 삭제, 종료 아이템 클릭 이벤트
  const onClickMenuItem = useCallback((isDelete: boolean, surveyId: number) => {
    if (isDelete) {
      openDeleteModal(surveyId);
      return;
    }
    // 종료 처리
  }, []);

  // 수요조사 목록 조회
  const getSurveyList = useCallback(() => {
    fetchAdminSurvey().then(
      (res) => {
        setSurveyList(res.data);
      },
      () => {
        openModal(modalData.ADMIN_SURVEY_FETCH_FAILURE);
      },
    );
  }, []);

  // 상세조회로 이동
  const moveToDetail = useCallback((data: IAdminSurvey) => {
    navigate('/admin/survey/detail', { state: data });
  }, []);

  useEffect(() => {
    getSurveyList();
  }, []);

  return (
    <div
      className="flex h-screen w-full flex-col bg-gray-100 px-5 py-10"
      onClick={closeMenu}
    >
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
          <SurveyItem
            key={item.id}
            survey={item}
            isOpen={openMenuID === item.id}
            onClickMore={onClickMore}
            onClickMenuItem={onClickMenuItem}
            onClickDetails={() => {
              moveToDetail(item);
            }}
          />
        ))}
      </ul>
    </div>
  );
};

export default AdminSurvey;
