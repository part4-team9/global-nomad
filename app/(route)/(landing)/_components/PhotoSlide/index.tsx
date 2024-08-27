'use client';

import PhotoCard from '../PhotoCard';

const PHOTO_CARDS = [
  {
    image: '/assets/images/banner-culture.jpg',
    title: '문화 · 예술',
  },
  {
    image: '/assets/images/banner-food.jpg',
    title: '식음료',
  },
  {
    image: '/assets/images/banner-sports.jpg',
    title: '스포츠',
  },
  {
    image: '/assets/images/banner-tour.jpg',
    title: '투어',
  },
  {
    image: '/assets/images/banner-sightseeing.jpg',
    title: '관광',
  },
  {
    image: '/assets/images/banner-wellness.jpg',
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
