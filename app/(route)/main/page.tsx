import BannerContainer from './_components/BannerContainer';
import BodyContainer from './_components/BodyContainer';
import MainPageLayout from './_components/Layout/\bMainPageLayout/indext';

export default function Home() {
  return (
    <MainPageLayout>
      <BannerContainer />
      <BodyContainer />
    </MainPageLayout>
  );
}
