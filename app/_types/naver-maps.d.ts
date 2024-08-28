// types/naver-maps.d.ts
// eslint-disable-next-line max-classes-per-file
declare namespace naver.maps {
  class LatLng {
    constructor(lat: number, lng: number);
  }
  class Map {
    constructor(element: HTMLElement, options: MapOptions);
  }
  class Marker {
    constructor(options: MarkerOptions);
  }
  interface MapOptions {
    center: LatLng;
    zoom: number;
  }
  interface MarkerOptions {
    map: Map;
    position: LatLng;
  }
}
