import Banner from './_components/Banner';
import Body from './_components/Body';

export default function Home() {
  return (
    <div className="box-border flex w-full min-w-full flex-col content-center items-center">
      <Banner />
      <Body />
    </div>
  );
}
