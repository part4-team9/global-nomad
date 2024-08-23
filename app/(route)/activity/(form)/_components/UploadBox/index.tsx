'use client';

import { useState } from 'react';
import Image from 'next/image';

import { cn } from '@/_utils/classNames';

import ImagePlus from 'public/assets/icons/image-upload.svg';

interface UploadBox extends React.InputHTMLAttributes<HTMLInputElement> {
  onDrop: React.DragEventHandler<HTMLDivElement>;
}

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
    onDrop(e);
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
      <input type="file" {...rest} className="absolute left-0 top-0 size-full cursor-pointer opacity-0" />
    </div>
  );
}

export default UploadBox;
