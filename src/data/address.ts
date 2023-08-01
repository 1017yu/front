interface IAdress {
  [key: string]: string;
}

export const EVENT_REGION_ITEMS = [
  { region: '전체' },
  { region: '서울' },
  { region: '경기' },
  { region: '인천' },
  { region: '부산' },
  { region: '대전' },
  { region: '대구' },
  { region: '울산' },
  { region: '세종' },
  { region: '울산' },
  { region: '광주' },
  { region: '강원' },
  { region: '충북' },
  { region: '충남' },
  { region: '경북' },
  { region: '경남' },
  { region: '전북' },
  { region: '전남' },
];

export const EVENT_STATE_ITEMS: IAdress[] = [
  { 전체: '전체' },
  { 서울: '강남' },
  { 서울: '강동' },
  { 서울: '강북' },
  { 서울: '강서' },
  { 서울: '관악' },
  { 서울: '광진' },
  { 서울: '구로' },
  { 서울: '금천' },
  { 서울: '노원' },
  { 서울: '도봉' },
  { 서울: '동대문' },
  { 서울: '동작' },
  { 서울: '마포' },
  { 서울: '서대문' },
  { 서울: '서초' },
  { 서울: '성동' },
  { 서울: '성북' },
  { 서울: '송파' },
  { 서울: '양천' },
  { 서울: '영등포' },
  { 서울: '용산' },
  { 서울: '은평' },
  { 서울: '종로' },
  { 서울: '중구' },
  { 서울: '중랑' },
  { 경기: '고양' },
];

export const EVENT_CATEGORY_ITEMS: IAdress[] = [
  { 전체: '전체' },
  { catergory: '레저' },
  { catergory: '패션' },
  { catergory: '식품' },
  { catergory: '스포츠' },
  { catergory: '아트' },
  { catergory: '뷰티' },
];
