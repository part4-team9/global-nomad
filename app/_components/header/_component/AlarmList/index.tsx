'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import type { Notification } from '@/_libs/notificationService';
import { getMyNotifications } from '@/_libs/notificationService';
import type { ExtractSentence } from '@/_utils/notification';
import { extractSentence, ListContentType } from '@/_utils/notification';

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
          <ListItem key={idx} notification={item} />
        ))}
      </div>
    </div>
  );
}

interface ListItemProps {
  notification: Notification;
}

function ListItem({ notification }: ListItemProps) {
  dayjs.extend(relativeTime);

  const extracted: ExtractSentence | null = extractSentence(notification.content);
  const timeSinceUpdate = dayjs(notification.updatedAt).fromNow();
  return (
    <div className="flex flex-col gap-1 rounded-[5px] border border-gray-100 bg-white px-3 py-4">
      {extracted && (
        <div>
          <ListContent extractedContent={extracted} />
          <div className="text-sm text-gray-500">{timeSinceUpdate}</div>
        </div>
      )}
    </div>
  );
}

interface ListContentProps {
  extractedContent: ExtractSentence;
}

function ListContent({ extractedContent }: ListContentProps) {
  const { sentence, type } = extractedContent;

  const typeText = (contentType: ListContentType) => {
    switch (contentType) {
      case ListContentType.CONFIRMED:
        return (
          <div className="whitespace-nowrap">
            예약이 <span className="text-blue-500">승인</span>되었습니다.
          </div>
        );
      case ListContentType.DECLINED:
        return (
          <p>
            예약이 <p className="text-red-500">거절</p>되었습니다.
          </p>
        );
      case ListContentType.NEW:
        return <p className="text-green-300">새로 들어왔어요.</p>;
      default:
        return '';
    }
  };

  const typeDot = (contentType: ListContentType) => {
    switch (contentType) {
      case ListContentType.CONFIRMED:
        return <Image src="/assets/icons/alarmList/alarm-dot-confirmed.svg" alt="alarm-dot-confirmed" width={5} height={5} />;
      case ListContentType.DECLINED:
        return <Image src="/assets/icons/alarmList/alarm-dot-declined.svg" alt="alarm-dot-declined" width={5} height={5} />;
      case ListContentType.NEW:
        return <Image src="/assets/icons/alarmList/alarm-dot-new.svg" alt="alarm-dot-new" width={5} height={5} />;
      default:
        return '';
    }
  };

  const splitSentence = (_sentence: string) => {
    const match = _sentence.match(/(.+)\((\d{4}-\d{2}-\d{2}\s~?\s?\d{2}:\d{2}~?\d{2}:\d{2})\)/);
    if (match) {
      return { title: match[1], time: match[2] };
    }
    return { title: _sentence, time: '' };
  };

  const { title, time } = splitSentence(sentence);

  return (
    <div>
      <div className="flex h-6 justify-between">
        {typeDot(type)}{' '}
        <button type="button" className="text-gray-500 hover:text-gray-700">
          X
        </button>
      </div>
      <div>
        <div className="text-md/[22px] font-medium">{title}</div>
        <div className="text-sm/[22px]">({time})</div>
        <div className="text-sm/[22px]">{typeText(type)}</div>
      </div>
    </div>
  );
}
