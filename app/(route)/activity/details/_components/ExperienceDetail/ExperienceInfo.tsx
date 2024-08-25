import Image from 'next/image';
import Rating from '@/_components/rating';
import Location from 'public/assets/icons/Location.svg';
import Dropdown from '../Dropdown';

interface ExperienceInfoProps {
  experience: {
    title: string;
    category: string;
    address: string;
    creatorId: number;
  };
  averageRating: number;
  totalReviews: number;
  currentUserId: number | null;
  handleEdit: () => void;
  handleDelete: () => void;
}

export default function ExperienceInfo({ experience, averageRating, totalReviews, currentUserId, handleEdit, handleDelete }: ExperienceInfoProps) {
  return (
    <div className="px-[16px] mobile:px-0">
      <div className="text-m mb-[10px] text-nomad-black">{experience.category}</div>
      <div className="mb-[10px] flex items-center justify-between">
        <h1 className="text-2xl font-bold mobile:text-[3xl]">{experience.title}</h1>
        <div className="relative">
          {currentUserId === experience.creatorId && (
            <div className="relative">
              <Dropdown onEdit={handleEdit} onDelete={handleDelete} />
            </div>
          )}
        </div>
      </div>

      <div className="mb-0 flex items-center gap-2 mobile:mb-[20px]">
        <span className="text-md text-nomad-black">
          <Rating rating={averageRating} reviewCount={totalReviews} ratingTarget={'detail'} />
        </span>
        <span className="flex gap-[2px]">
          <Image src={Location} alt="Location" width={16} height={16} />
          <span className="text-md text-nomad-black">{experience.address}</span>
        </span>
      </div>
    </div>
  );
}
