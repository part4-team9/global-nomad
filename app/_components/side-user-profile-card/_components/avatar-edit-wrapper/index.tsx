import Image from 'next/image';
import IconProfileEdit from 'public/assets/icons/profile-card/profile-edit';

function EditButton() {
  return (
    <button type="button" className="flex h-11 w-11 items-center justify-center rounded-[50%] bg-green-200" aria-label="Edit">
      <IconProfileEdit />
    </button>
  );
}

export default function AvatarEditWrapper({ avatarSrc }: { avatarSrc: string }) {
  return (
    <div className="flex h-[160px] w-[160px] cursor-pointer items-end justify-end overflow-hidden">
      <div className="absolute mr-[12.5px]">
        <EditButton />
      </div>
      <div className="h-[160px] w-[160px] overflow-hidden rounded-[50%]">
        <Image src={avatarSrc} alt="user avatar" width={160} height={160} priority />
      </div>
    </div>
  );
}
