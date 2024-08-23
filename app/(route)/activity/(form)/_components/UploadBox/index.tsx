'use client';

import { useState } from 'react';
import Image from 'next/image';

import { cn } from '@/_utils/classNames';

import ImagePlus from 'public/assets/icons/image-upload.svg';

interface UploadBox extends React.InputHTMLAttributes<HTMLInputElement> {
  onDrop?: React.DragEventHandler<HTMLDivElement>;
}

/**
 * UploadBox 컴포넌트는 사용자가 이미지를 업로드할 수 있는 드롭존을 제공합니다.
 * 사용자는 이미지를 드래그 앤 드롭하거나, 클릭하여 이미지를 업로드할 수 있습니다.
 *
 * @param {React.DragEventHandler<HTMLDivElement>} [onDrop] - 이미지가 드롭될 때 호출되는 핸들러입니다.
 */
function UploadBox({ onDrop, ...rest }: UploadBox) {
  const [isDrag, setIsDrag] = useState(false);

  const handleDrag = () => {
    setIsDrag((prev) => !prev);
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleDropImage: React.DragEventHandler<HTMLDivElement> = (e) => {
    handleDrag();
    if (onDrop) {
      onDrop(e);
    }
  };

  return (
    <div
      className={cn(
        'relative flex aspect-square flex-col items-center justify-center gap-[30px] rounded-xl border border-dashed border-gray-700 p-2',
        isDrag && 'border-2 bg-gray-100',
      )}
      onDragOver={handleDragOver}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDropImage}
    >
      <Image src={ImagePlus} alt="등록" />
      <span className="break-keep text-center text-lg leading-[1.1] text-gray-700">이미지를 드래그하거나 클릭해서 업로드하세요</span>
      <input type="file" accept='"image/png, image/jpeg, image/jpg"' {...rest} className="absolute left-0 top-0 size-full cursor-pointer opacity-0" />
    </div>
  );
}

export default UploadBox;
