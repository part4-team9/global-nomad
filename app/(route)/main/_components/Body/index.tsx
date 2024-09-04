import AllActivityLists from '../AllActivityLists';
import HotActivityLists from '../HotActivityLists';
import SearchBox from '../SearchBox';

export default function Body() {
  return (
    <div className="relative bottom-[20px] mx-auto w-full px-[16px] lg:max-w-[1200px] mobile:bottom-[20px] mobile:px-[24px]">
      <SearchBox />
      <HotActivityLists />
      <AllActivityLists />
    </div>
  );
}
