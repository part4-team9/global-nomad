'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { Notification } from '@/_libs/notificationService';
import { deleteNotification, getMyNotifications, getReadNotificationIds, markNotificationAsRead } from '@/_libs/notificationService';
import type { ExtractSentence } from '@/_utils/notification';
import { extractSentence, ListContentType } from '@/_utils/notification';

import alarm from 'public/assets/icons/alarm.svg';

export default function AlarmList() {
  const [showList, setShowList] = useState(false);
  const queryClient = useQueryClient();

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

  const handleDelete = async (notificationId: number) => {
    try {
      await deleteNotification(notificationId);
      await queryClient.invalidateQueries({ queryKey: ['notifications'] });
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  return (
    <div className="relative flex flex-row justify-center">
      <button type="button" aria-label="alarm-list-btn" className="flex cursor-pointer" onClick={toggleDropdown}>
        <Image src={alarm} alt="alarm" />
      </button>
      {showList && myNotifications && myNotifications.notifications.length > 0 && (
        <List onClose={toggleDropdown} listItems={myNotifications.notifications} onDelete={handleDelete} />
      )}
    </div>
  );
}

interface ListProps {
  listItems: Notification[];
  onClose: () => void;
  onDelete: (notificationId: number) => void;
}

function List({ onClose, listItems, onDelete }: ListProps) {
  const readNotificationIds = getReadNotificationIds();

  const sortedListItems = listItems.sort((a, b) => {
    const aIsRead = readNotificationIds.includes(a.id);
    const bIsRead = readNotificationIds.includes(b.id);

    if (aIsRead === bIsRead) return 0;
    if (aIsRead) return 1;
    return -1;
  });
  return (
    <div className="absolute mt-10 flex w-[328px] flex-col justify-center gap-4 rounded-[10px] border border-gray-300 bg-green-100 px-5 py-6">
      <div className="flex justify-between">
        <h3>{`알림 ${sortedListItems.length}개`}</h3>
        <button type="button" onClick={onClose}>
          <Image src="/assets/icons/close.svg" alt="close-btn" width={24} height={24} />
        </button>
      </div>
      <div className="flex max-h-[400px] flex-col gap-2 overflow-y-scroll pr-1">
        {sortedListItems.map((item, idx) => (
          <ListItem key={idx} notification={item} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

interface ListItemProps {
  notification: Notification;
  onDelete: (notificationId: number) => void;
}

function ListItem({ notification, onDelete }: ListItemProps) {
  dayjs.extend(relativeTime);

  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    const readNotifications = getReadNotificationIds();
    setIsRead(readNotifications.includes(notification.id));
  }, [notification.id]);

  const handleClick = () => {
    markNotificationAsRead(notification.id);
    setIsRead(true);
  };

  const extracted: ExtractSentence | null = extractSentence(notification.content);
  const timeSinceUpdate = dayjs(notification.updatedAt).fromNow();

  return (
    <Link href={`/activity/details/${notification.id - 57}`} target="_blank">
      <div
        className={`flex flex-col gap-1 rounded-[5px] border border-gray-100 bg-white px-3 py-4 ${isRead ? 'opacity-50' : 'opacity-100'}`}
        onClick={handleClick}
      >
        {extracted && (
          <div>
            <ListContent extractedContent={extracted} notificationId={notification.id} onDelete={onDelete} />
            <div className="mt-2 text-sm text-gray-500">{timeSinceUpdate}</div>
          </div>
        )}
      </div>
    </Link>
  );
}

interface ListContentProps {
  extractedContent: ExtractSentence;
  notificationId: number;
  onDelete: (notificationId: number) => void;
}

function ListContent({ extractedContent, notificationId, onDelete }: ListContentProps) {
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
          <div>
            예약이 <span className="text-red-500">거절</span>되었습니다.
          </div>
        );
      case ListContentType.NEW:
        return <div className="text-green-300">새로 들어왔어요.</div>;
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
        return null;
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
        <button type="button" className="text-gray-500 hover:text-gray-700" onClick={() => onDelete(notificationId)}>
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
