import Image from 'next/image';
import Link from 'next/link';

import GithubIcon from 'public/assets/icons/github.svg';
import WhiteLogo from 'public/assets/icons/logo-white.svg';
import NotionIcon from 'public/assets/icons/notion.svg';

function Footer() {
  return (
    <div className="bg-nomad-black py-8">
      <div className="mx-auto grid max-w-[1248px] gap-10 px-6">
        <div className="ml-auto flex items-center gap-3">
          <Link target="_blank" href="https://bejewled-vanadium-ddd.notion.site/22221b10bfc84b4f8d87d20e44b18d9e" className="size-5">
            <Image src={NotionIcon} alt="Notion" />
          </Link>
          <Link target="_blank" href="https://github.com/part4-team9/global-nomad" className="size-5">
            <Image src={GithubIcon} alt="Github" />
          </Link>
        </div>
        <div className="flex flex-col-reverse items-center justify-between gap-3 mobile:flex-row">
          <p className="text-xs text-[#676767] mobile:text-[14px]">&copy;codeit - 2023</p>
          <Link href="/">
            <Image src={WhiteLogo} alt="GlobalNomad" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
