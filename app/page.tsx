import CardFrame from './_components/card-frame';
import ExampleAxios from './_components/example-axios';
import ExampleZustand from './_components/example-zustand';
import { cardFrameExample } from './_mocks/reservation';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {cardFrameExample.map((card, idx) => (
        <CardFrame key={idx} date={card.date} img={card.img} participants={card.participants} price={card.price} status={card.status} title={card.title} />
      ))}
    </main>
  );
}
