import axios from 'axios';

// Naver Geocode API 응답 형식에 맞는 타입 정의
interface NaverGeocodeResponse {
  addresses: {
    x: string;
    y: string;
  }[];
}

export default async function getCoordinates(address: string) {
  try {
    // 실제 Naver Geocode API URL 사용
    const response = await axios.get<NaverGeocodeResponse>('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode', {
      params: { query: address },
      headers: {
        'X-NCP-APIGW-API-KEY-ID': process.env.NEXT_PUBLIC_NAVER_CLIENT_ID as string,
        'X-NCP-APIGW-API-KEY': process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET as string,
      },
    });

    if (response.data.addresses.length > 0) {
      const { x, y } = response.data.addresses[0];
      return { latitude: parseFloat(y), longitude: parseFloat(x) };
    }

    throw new Error('Coordinates not found');
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw new Error('Error fetching coordinates');
  }
}
