export const NAV_ITEMS = [
  {
    label: '팝업스토어',
    href: '/events',
  },
  {
    label: '회원 커뮤니티',
    href: '/community',
  },
  {
    label: '수요조사 결과',
    href: '/survey-results',
  },
];

export const ADMIN_NAV_ITEMS = [
  {
    label: '수요조사',
    href: '/admin/survey',
    children: ['/admin/survey/detail'],
  },
  {
    label: '이벤트관리',
    href: '/admin/events',
    children: [],
  },
  {
    label: '회원관리',
    href: '/admin/users',
    children: [],
  },
];
