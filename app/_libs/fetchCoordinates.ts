import axios from 'axios';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export async function fetchCoordinates(address: string): Promise<Coordinates | null> {
  try {
    // 로컬 환경에서는 NEXT_PUBLIC_API_URL, 배포 환경에서는 NEXT_PUBLIC_API_BASE_URL 사용
    const apiUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_BASE_URL : process.env.NEXT_PUBLIC_API_URL;

    const response = await axios.get(`${apiUrl}/api`, {
      params: { address },
    });

    return response.data as Coordinates;
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert('좌표를 가져오는 중에 오류가 발생했습니다.');
    return null;
  }
}
