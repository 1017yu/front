import { createTheme } from '@mui/material/styles';

export const API_BASE_URL = 'http://15.164.205.25:8080/api';

export const NAV_ITEMS = [
  {
    label: '팝업스토어',
    href: '/events',
  },
  {
    label: '공간찾기',
    href: '/search',
  },
  {
    label: '회원 커뮤니티',
    href: '/community',
  },
  {
    label: '수요조사 결과',
    href: '/survey-results',
  },
  // {
  //   label: '임차대행',
  //   href: '/rent',
  // },
  // {
  //   label: '프로모션대행',
  //   href: '/promotion',
  // },
];

export const ADMIN_NAV_ITEMS = [
  {
    label: 'menu 1',
    href: '/admin',
    children: [], // 하위 메뉴 href
  },
  {
    label: 'menu 2',
    href: '/admin/menu2',
    children: [],
  },
  {
    label: '수요조사',
    href: '/admin/survey',
    children: ['/admin/survey/detail'],
  },
];

// 이메일 유효성 정규식
export const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

// 비밀번호 8자리 이상 숫자 최소 1개, 문자 최소 1개
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

// 닉네임 정규식(영어, 숫자, 특수기호( . , _ , - 만 허용) 2~10글자)
export const NICKNAME_REGEX = /^[a-z0-9._-]{2,10}$/;

export const EVENT_CATEGORY_OPTIONS = [
  '레저',
  '패션',
  '식품',
  '스포츠',
  '아트',
  '뷰티',
];

export const ADRESS_SELECT_OPTIONS = [
  {
    city: '서울특별시',
    district: [
      '강남구',
      '강동구',
      '강북구',
      '강서구',
      '관악구',
      '광진구',
      '구로구',
      '금천구',
      '노원구',
      '도봉구',
      '동대문구',
      '동작구',
      '마포구',
      '서대문구',
      '서초구',
      '성동구',
      '성북구',
      '송파구',
      '양천구',
      '영등포구',
      '용산구',
      '은평구',
      '종로구',
      '중구',
      '중랑구',
    ],
  },
  {
    city: '부산광역시',
    district: [
      '강서구',
      '금정구',
      '기장군',
      '남구',
      '동구',
      '동래구',
      '부산진구',
      '북구',
      '사상구',
      '사하구',
      '서구',
      '수영구',
      '연제구',
      '영도구',
      '중구',
      '해운대구',
    ],
  },
  {
    city: '대구광역시',
    district: [
      '남구',
      '달서구',
      '달성군',
      '동구',
      '북구',
      '서구',
      '수성구',
      '중구',
    ],
  },
  {
    city: '인천광역시',
    district: [
      '강화군',
      '계양구',
      '남구',
      '남동구',
      '동구',
      '부평구',
      '서구',
      '연수구',
      '옹진군',
      '중구',
    ],
  },
  {
    city: '광주광역시',
    district: ['광산구', '남구', '동구', '북구', '서구'],
  },
  {
    city: '대전광역시',
    district: ['대덕구', '동구', '서구', '유성구', '중구'],
  },
  {
    city: '울산광역시',
    district: ['남구', '동구', '북구', '울주군', '중구'],
  },
  {
    city: '경기도',
    district: [
      '가평군',
      '고양시 덕양구',
      '고양시 일산동구',
      '고양시 일산서구',
      '과천시',
      '광명시',
      '광주시',
      '구리시',
      '군포시',
      '김포시',
      '남양주시',
      '동두천시',
      '부천시 소사구',
      '부천시 오정구',
      '부천시 원미구',
      '성남시 분당구',
      '성남시 수정구',
      '성남시 중원구',
      '수원시 권선구',
      '수원시 영통구',
      '수원시 장안구',
      '수원시 팔달구',
      '시흥시',
      '안산시 단원구',
      '안산시 상록구',
      '안성시',
      '안양시 동안구',
      '안양시 만안구',
      '양주시',
      '양평군',
      '여주군',
      '연천군',
      '오산시',
      '용인시 기흥구',
      '용인시 수지구',
      '용인시 처인구',
      '의왕시',
      '의정부시',
      '이천시',
      '파주시',
      '평택시',
      '포천시',
      '하남시',
      '화성시',
    ],
  },
  {
    city: '강원특별자치도',
    district: [
      '강릉시',
      '고성군',
      '동해시',
      '삼척시',
      '속초시',
      '양구군',
      '양양군',
      '영월군',
      '원주시',
      '인제군',
      '정선군',
      '철원군',
      '춘천시',
      '태백시',
      '평창군',
      '홍천군',
      '화천군',
      '횡성군',
    ],
  },
  {
    city: '충청북도',
    district: [
      '괴산군',
      '단양군',
      '보은군',
      '영동군',
      '옥천군',
      '음성군',
      '제천시',
      '증평군',
      '진천군',
      '청원군',
      '청주시 상당구',
      '청주시 흥덕구',
      '충주시',
    ],
  },
  {
    city: '충청남도',
    district: [
      '계룡시',
      '공주시',
      '금산군',
      '논산시',
      '당진시',
      '보령시',
      '부여군',
      '서산시',
      '서천군',
      '아산시',
      '연기군',
      '예산군',
      '천안시 동남구',
      '천안시 서북구',
      '청양군',
      '태안군',
      '홍성군',
    ],
  },
  {
    city: '전라북도',
    district: [
      '고창군',
      '군산시',
      '김제시',
      '남원시',
      '무주군',
      '부안군',
      '순창군',
      '완주군',
      '익산시',
      '임실군',
      '장수군',
      '전주시 덕진구',
      '전주시 완산구',
      '정읍시',
      '진안군',
    ],
  },
  {
    city: '전라남도',
    district: [
      '강진군',
      '고흥군',
      '곡성군',
      '광양시',
      '구례군',
      '나주시',
      '담양군',
      '목포시',
      '무안군',
      '보성군',
      '순천시',
      '신안군',
      '여수시',
      '영광군',
      '영암군',
      '완도군',
      '장성군',
      '장흥군',
      '진도군',
      '함평군',
      '해남군',
      '화순군',
    ],
  },
  {
    city: '경상북도',
    district: [
      '경산시',
      '경주시',
      '고령군',
      '구미시',
      '군위군',
      '김천시',
      '문경시',
      '봉화군',
      '상주시',
      '성주군',
      '안동시',
      '영덕군',
      '영양군',
      '영주시',
      '영천시',
      '예천군',
      '울릉군',
      '울진군',
      '의성군',
      '청도군',
      '청송군',
      '칠곡군',
      '포항시 남구',
      '포항시 북구',
    ],
  },
  {
    city: '경상남도',
    district: [
      '거제시',
      '거창군',
      '고성군',
      '김해시',
      '남해군',
      '밀양시',
      '사천시',
      '산청군',
      '양산시',
      '의령군',
      '진주시',
      '창녕군',
      '창원시 마산합포구',
      '창원시 마산회원구',
      '창원시 성산구',
      '창원시 의창구',
      '창원시 진해구',
      '통영시',
      '하동군',
      '함안군',
      '함양군',
      '합천군',
    ],
  },
  {
    city: '제주특별자치도',
    district: ['서귀포시', '제주시'],
  },
  {
    city: '세종특별자치시',
    district: ['세종시'],
  },
];
export const ITEMS_COUNT_PER_COMMUNITY_PAGE = 10;
export const PAGE_RANGE_DISPLAY = 5;

// 전체 이벤트 조회
export const COUNT_PER_EVENTS_PAGE = 12;

// 모든 이벤트 조회 페이지 테마 생성
export const EVENTS_THEME = createTheme({
  palette: {
    primary: {
      main: 'rgb(0 201 167)', // 커스텀 primary 색상
    },
    secondary: {
      main: '#fff',
    },
  },
});

// 수요조사 연령대 옵션
export const AGE_OPTIONS = [
  {
    id: 10,
    content: '10대',
  },
  {
    id: 20,
    content: '20대',
  },
  {
    id: 30,
    content: '30대',
  },
  {
    id: 40,
    content: '40대',
  },
  {
    id: 50,
    content: '50대 이상',
  },
];

// 차트 컬러
export const CHART_COLORS = [
  '#00C9A7',
  '#00b496',
  '#00a085',
  '#008c74',
  '#007864',
  '#006453',
  '#005042',
  '#003c32',
  '#002821',
  '#001410',
];

// 파이 차트 컬러
export const PIE_COLORS = [
  '#0088FE',
  '#00C9A7',
  '#FFBB28',
  '#FF8042',
  '#845EC2',
  '#BDE0FE',
  '#FF4262',
  '#4E5B68',
  '#FE0088',
  '#42FF80',
];

export const POST_CATERGORY = [
  '레저',
  '패션',
  '식품',
  '스포츠',
  '아트',
  '뷰티',
];

export const POST_INPUT_TITLE = {
  catergory: '카테고리',
  name: ['행사 이름', '행사 이름을 입력해주세요.'],
  city: '도, 시',
  district: '구, 군',
  period: '행사 기간',
  descripton: ['상세 설명', '행사 상세 설명을 입력해주세요.'],
};

export const eventData = {
  EVENT_POST_TITLE: '행사 등록',
  EVENT_JOIN_SELLER: '참여하는 셀러',
  EVENT_BUTTON_CONTENT: {
    join: '참가하기',
    cancel: '참가 취소',
    delete: '행사 삭제',
    modify: '행사 수정',
  },
  EVENT_RECENT_STORE: {
    title: '최근 등록된 스토어',
    content: '+ 더보기',
  },
  EVENT_BEAUTY_STORE: {
    title: '뷰티 스토어',
  },
  EVENT_DETAIL_DESCRIPTION: {
    title: '상세 설명',
  },
  EVENT_DETAIL_MAP: {
    title: '스토어 위치',
  },
  EVENT_STATUS_READY: {
    title: '시작전',
    color: 'bg-statusReady',
  },
  EVENT_STATUS_INPROGRESS: {
    title: '진행중',
    color: 'bg-accent',
  },
  EVENT_STATUS_DONE: {
    title: '마감',
    color: 'bg-subTextAndBorder',
  },
};
