import Image from 'next/image';
import IconProfileEdit from 'public/assets/icons/profile-card/profile-edit';

interface AvatarEditBtnWrapperProps {
  avatarSrc: string;
  onClick: () => void;
}

export default function AvatarEditBtnWrapper({ avatarSrc, onClick }: AvatarEditBtnWrapperProps) {
  return (
    <div className="flex size-[160px] cursor-pointer items-end justify-end overflow-hidden">
      <div className="absolute mr-[12.5px]">
        <EditButton onClick={onClick} />
      </div>
      <div className="size-[160px] overflow-hidden rounded-[50%]">
        <Image src={avatarSrc} alt="user avatar" width={160} height={160} priority />
      </div>
    </div>
  );
}

interface EditButtonProps {
  onClick: () => void;
}

function EditButton({ onClick }: EditButtonProps) {
  return (
    <button onClick={onClick} type="button" className="flex size-11 items-center justify-center rounded-[50%] bg-green-200" aria-label="Edit">
      <IconProfileEdit />
    </button>
  );
}
