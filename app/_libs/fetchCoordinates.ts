import axios from 'axios';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export async function fetchCoordinates(address: string): Promise<Coordinates | null> {
  try {
    const response = await axios.get('/api/getCoordinates', {
      params: { address },
    });

    return response.data as Coordinates;
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert('좌표를 가져오는 중에 오류가 발생했습니다.');
    return null;
  }
}
