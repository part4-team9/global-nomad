'use client';

import { useState } from 'react';

import AllActivityLists from './_components/main-page/AllActivityLists';
import Banner from './_components/main-page/Banner';
import HotActivityLists from './_components/main-page/HotActivityLists';
import SearchBox from './_components/main-page/SearchBox';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="box-border flex w-full flex-col content-center items-center">
      <Banner />
      <SearchBox onSearch={handleSearch} />
      <div className="relative top-[90px] mx-auto w-full px-[16px] mobile:top-[150px] mobile:px-[24px] lg:max-w-[1200px]">
        {searchValue === '' && <HotActivityLists />}
        <AllActivityLists searchValue={searchValue} />
      </div>
    </div>
  );
}
