import { useEffect } from 'react';
import Title from '../ui/Title';
import { eventData } from '@/data/constants';
import Hr from '../ui/Hr';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapTest() {
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.src = `${import.meta.env.VITE_KAKAO_MAP_BASE_URL}?appkey=${
      import.meta.env.VITE_KAKAO_MAP_API_KEY
    }&autoload=false`;

    mapScript.addEventListener('load', () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // LatLng로 수정
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(
          33.450701,
          126.570667,
        );

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
      });
    });

    document.head.appendChild(mapScript);
  }, []);

  return (
    <div className="hidden sm:block">
      <Title text={eventData.EVENT_DETAIL_MAP} center />
      <div className="mt-4 flex justify-center sm:mt-8">
        <div id="map" className="h-[500px] w-[640px]" />
      </div>
      <Hr />
    </div>
  );
}
