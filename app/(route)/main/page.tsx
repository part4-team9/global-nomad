'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import AllActivityLists from './_components/AllActivityLists';
import Banner from './_components/Banner';
import HotActivityLists from './_components/HotActivityLists';
import SearchBox from './_components/SearchBox';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <motion.div initial={{ y: -20, opacity: 0.8 }} animate={{ y: 0, opacity: 1 }}>
      <div className="box-border flex w-full min-w-full flex-col content-center items-center">
        <Banner />
        <SearchBox onSearch={handleSearch} />
        <div className="relative bottom-[20px] mx-auto w-full px-[16px] lg:max-w-[1200px] mobile:bottom-[20px] mobile:px-[24px]">
          {searchValue === '' && <HotActivityLists />}
          <AllActivityLists searchValue={searchValue} />
        </div>
      </div>
    </motion.div>
  );
}
