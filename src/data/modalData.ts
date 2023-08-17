// * type
// * basic : 기본 (취소버튼 한개)
// * twoButton : 버튼 두개 (왼-확인, 오른-취소)

export const modalData = {
  ADMIN_SURVEY_FETCH_FAILURE: {
    type: 'basic',
    title: '수요조사 조회',
    content: '수요조사 목록 조회 중 오류가 발생했습니다. 다시 시도해주세요.',
    cancelButton: '확인',
  },
  ADMIN_SURVEY_SUCCESS: {
    type: 'basic',
    title: '수요조사 등록',
    content: '수요조사가 등록되었습니다.',
    cancelButton: '확인',
  },
  ADMIN_SURVEY_FAILURE: {
    type: 'basic',
    title: '수요조사 등록',
    content: '수요조사 등록 중 오류가 발생했습니다. 다시 시도해주세요.',
    cancelButton: '확인',
  },
  ADMIN_SURVEY_DELETE_CONFIRM: {
    type: 'twoButton',
    title: '수요조사 삭제',
    content: '선택하신 수요조사를 삭제하시겠습니까?',
    okButton: '삭제',
    cancelButton: '취소',
  },
  ADMIN_RESPONSE_ERROR: {
    type: 'basic',
    title: '오류 발생',
    content: '',
    cancelButton: '취소',
  },
  ADMIN_SURVEY_FETCH_DETAIL_FAILURE: {
    type: 'basic',
    title: '수요조사 조회',
    content: '수요조사 조회 중 오류가 발생했습니다. 다시 시도해주세요.',
    cancelButton: '확인',
  },
};
