'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import type { Notification } from '@/_libs/notificationService';
import { getMyNotifications } from '@/_libs/notificationService';

import alarm from 'public/assets/icons/alarm.svg';

export default function AlarmList() {
  const [showList, setShowList] = useState(false);

  const { data: myNotifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: getMyNotifications,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    refetchIntervalInBackground: true, // Refetch in the background
    enabled: true, // Automatically execute
  });

  const toggleDropdown = () => {
    setShowList((prev) => !prev);
  };

  return (
    <div className="relative flex flex-row justify-center">
      <button type="button" aria-label="alarm-list-btn" className="flex cursor-pointer" onClick={toggleDropdown}>
        <Image src={alarm} alt="alarm" />
      </button>
      {showList && myNotifications && myNotifications.notifications.length > 0 && <List onClose={toggleDropdown} listItems={myNotifications.notifications} />}
    </div>
  );
}

interface ListProps {
  listItems: Notification[];
  onClose: () => void;
}

function List({ onClose, listItems }: ListProps) {
  return (
    <div className="absolute mt-10 flex w-[328px] flex-col justify-center gap-4 rounded-[10px] border border-gray-300 bg-green-100 px-5 py-6">
      <div className="flex justify-between">
        <h3>{`알림 ${listItems.length}개`}</h3>
        <button type="button" onClick={onClose}>
          <Image src="/assets/icons/close.svg" alt="close-btn" width={24} height={24} />
        </button>
      </div>
      <div className="flex max-h-[400px] flex-col gap-2 overflow-y-scroll pr-1">
        {listItems.map((item, idx) => (
          <ListItem key={idx} />
        ))}
      </div>
    </div>
  );
}

function ListItem() {
  return <div className="flex flex-col gap-1 rounded-[5px] border border-gray-100 bg-white px-3 py-4">asdasd</div>;
}
