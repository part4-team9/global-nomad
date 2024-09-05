import BannerContainer from './_components/BannerContainer';
import BodyContainer from './_components/BodyContainer';
import ActivitiyLayout from './_components/Layout/ActivitiyLayout/indext';

export default function Home() {
  return (
    <ActivitiyLayout>
      <BannerContainer />
      <BodyContainer />
    </ActivitiyLayout>
  );
}
