'use client';

import PhotoCard from '../PhotoCard';

const PHOTO_CARDS = [
  {
    image: '/assets/images/banner-culture.png',
    title: '문화 · 예술',
  },
  {
    image: '/assets/images/banner-food.png',
    title: '식음료',
  },
  {
    image: '/assets/images/banner-sports.png',
    title: '스포츠',
  },
  {
    image: '/assets/images/banner-tour.png',
    title: '투어',
  },
  {
    image: '/assets/images/banner-sightseeing.png',
    title: '관광',
  },
  {
    image: '/assets/images/banner-wellness.png',
    title: '웰빙',
  },
];

function PhotoSlide() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="flex items-center justify-center">
        <div className="group flex w-fit overflow-hidden">
          <div className="flex animate-infinite-slide-original gap-7 pr-7">
            {PHOTO_CARDS.map((card) => (
              <PhotoCard key={card.title} {...card} />
            ))}
          </div>
          <div className="flex animate-infinite-slide-copy gap-7 pr-7">
            {PHOTO_CARDS.map((card) => (
              <PhotoCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhotoSlide;
