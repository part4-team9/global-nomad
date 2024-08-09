import CardFrame from './_components/card-frame';
import { mockContentsList } from './_mocks/forCardFrame';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {mockContentsList.map((card, idx) => (
        <CardFrame key={idx} contents={card} img="https://api.surfit.io/v1/category/content-cover/develop/web-dev/1x" />
      ))}
    </main>
  );
}
