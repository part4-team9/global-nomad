import { useEffect } from 'react';

// NaverMap 컴포넌트의 props 타입 정의
interface NaverMapProps {
  latitude: number;
  longitude: number;
}

// Naver Maps API의 타입 정의
interface LatLng {
  new (lat: number, lng: number): naver.maps.LatLng;
}

interface MapOptions {
  center: naver.maps.LatLng;
  zoom: number;
}

interface MarkerOptions {
  map: naver.maps.Map;
  position: naver.maps.LatLng;
}

interface NaverMaps {
  LatLng: LatLng;
  Map: new (element: HTMLElement, options: MapOptions) => naver.maps.Map;
  Marker: new (options: MarkerOptions) => naver.maps.Marker;
}

// 글로벌 네임스페이스에 naver 추가
declare global {
  interface Window {
    naver: {
      maps?: NaverMaps;
    };
  }
}

// 컴포넌트 정의 및 타입 적용
export default function NaverMap({ latitude, longitude }: NaverMapProps) {
  useEffect(() => {
    const loadMap = () => {
      if (document.getElementById('naver-map-script')) return;

      const script = document.createElement('script');
      script.id = 'naver-map-script';
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        const { maps } = window.naver;

        if (maps) {
          const latLng = new maps.LatLng(latitude, longitude);

          const mapOptions: MapOptions = {
            center: latLng,
            zoom: 15,
          };
          const map = new maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

          const markerOptions: MarkerOptions = {
            position: latLng,
            map,
          };
          // eslint-disable-next-line no-new
          new maps.Marker(markerOptions);
        } else {
          console.error('Naver Maps API가 로드되지 않았습니다.');
        }
      };

      script.onerror = () => {
        console.error('네이버 지도 API를 로드하는 데 실패했습니다.');
      };
    };

    loadMap();
  }, [latitude, longitude]);

  return <div id="map" style={{ width: '100%', height: '400px' }} className="rounded-[16px]" />;
}
