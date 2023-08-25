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
  ADMIN_SURVEY_MODIFY_SUCCESS: {
    type: 'basic',
    title: '수요조사 수정',
    content: '수요조사가 수정되었습니다.',
    cancelButton: '확인',
  },
  ADMIN_SURVEY_MODIFY_FAILURE: {
    type: 'basic',
    title: '수요조사 수정',
    content:
      '수요조사 수정 중 오류가 발생했습니다. 데이터를 다시 확인해주세요.',
    cancelButton: '확인',
  },
  LOGIN_REQUIRED: {
    type: 'twoButton',
    title: '로그인',
    content: '로그인이 필요한 서비스입니다.\n로그인하시겠습니까?',
    okButton: '로그인',
    cancelButton: '닫기',
  },
  SURVEY_RESULT_FETCH_FAILURE: {
    type: 'basic',
    title: '수요조사 결과 조회',
    content: '수요조사 결과 조회 중 오류가 발생했습니다. 다시 시도해주세요.',
    cancelButton: '확인',
  },
  SELLER_POST_CHECK: {
    type: 'twoButton',
    title: '스토어 등록',
    content: '스토어를 등록하시겠습니까?',
    okButton: '등록',
    cancleButton: '닫기',
  },
  SELLER_DELETE_CHECK: {
    type: 'twoButton',
    title: '등록된 스토어 삭제',
    content:
      '⚠️ 해당 스토어를 삭제하시겠습니까? \n삭제된 게시글은 복구 되지 않습니다.',
    okButton: '삭제',
    cancleButton: '취소',
  },
  SELLER_JOIN_CHECK: {
    type: 'twoButton',
    title: '행사에 셀러로 참가',
    content: '해당 스토어에 참가하시겠습니까?',
    okButton: '참가',
    cancleButton: '취소',
  },

  SELLER_CANCEL_CHECK: {
    type: 'twoButton',
    title: '참가 예정 행사 취소',
    content: '참가 예정인 행사를 참가 취소하시겠습니까?',
    okButton: '확인',
    cancleButton: '뒤로 가기',
  },
  SELLER_MODIFY_CHECK: {
    type: 'twoButton',
    title: '등록된 스토어 수정',
    content: '수정하시겠습니까?',
    okButton: '수정',
    cancleButton: '취소',
  },
};
