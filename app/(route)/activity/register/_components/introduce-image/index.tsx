/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SubImage } from '@/_apis/activities/getActivity';
import postImage from '@/_apis/activities/postImage';
import type { ActivityEdit, EditDetail } from '@/(route)/activity/edit/[id]/page';
import { useMutation } from '@tanstack/react-query';

import type { Activity } from '../../page';
import CommonModal from '../common-modal';
import FileInput from '../file-input';

interface IntroduceImage {
  editValue?: SubImage[];
  setEditDetailData?: Dispatch<SetStateAction<EditDetail>>;
  setEditFormData?: Dispatch<SetStateAction<ActivityEdit>>;
  setRegisterFormData?: Dispatch<SetStateAction<Activity>>;
  value?: string[];
}

function IntroduceImage({ value, editValue, setRegisterFormData, setEditFormData, setEditDetailData }: IntroduceImage) {
  const router = useRouter();
  const [subImages, setSubImages] = useState<string[]>([]);
  const [editImages, setEditImages] = useState<SubImage[]>([]);
  const [imageLimitModal, setImageLimitModal] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: '',
    onClose: () => {},
  });

  console.log(value);

  const closeModal = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
    modalState.onClose();
  };

  const activityMutation = useMutation({
    mutationFn: postImage,
    onError: (error) => {
      if (typeof error === 'number') {
        if (error === 401) {
          setModalState({
            isOpen: true,
            message: '로그인이 필요한 서비스입니다.',
            onClose: () => {
              router.push('/login');
            },
          });
        } else {
          setModalState((prev) => ({
            ...prev,
            isOpen: true,
            message: '죄송합니다. 이미지 등록에 실패했습니다.',
          }));
        }
      }
    },
  });

  const clearSubImage = (image: string) => {
    setSubImages((prev) => prev.filter((img) => img !== image));
  };

  const handleModalState = () => {
    setImageLimitModal((prev) => !prev);
  };

  const handleSubImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageLength = e.target.files.length + subImages.length + editImages.length;

      if (imageLength > 4) {
        handleModalState();
      } else {
        const filesArray = Array.from(e.target.files);

        filesArray.forEach((file, idx) => {
          if (e.target.files) {
            /**
             * @TODO api 체험 이미지 url로 변경 필요
             */
            // activityMutation.mutate(e.target.files[idx]);
            const imageUrl = URL.createObjectURL(file);
            if (editValue && setEditFormData && setEditDetailData) {
              setEditImages((prev) => [...prev, { imageUrl }]);
              setEditFormData((prev) => ({
                ...prev,
                subImageUrlsToAdd: [...prev.subImageUrlsToAdd, imageUrl],
              }));
              setEditDetailData((prev) => ({
                ...prev,
                subImages: [...prev.subImages, { imageUrl }],
              }));
            } else {
              setSubImages((prev) => [...prev, imageUrl]);
            }
          }
        });
      }
    }
  };

  useEffect(() => {
    if (setRegisterFormData) {
      setRegisterFormData((prev) => {
        if (JSON.stringify(prev.subImageUrls) !== JSON.stringify(subImages)) {
          return {
            ...prev,
            subImageUrls: subImages,
          };
        }
        return prev;
      });
    }
  }, [subImages]);

  useEffect(() => {
    if (editValue) {
      setEditImages(editValue);
    }
  }, [editValue]);

  return (
    <div className="grid gap-6">
      <label htmlFor="sub" className="w-fit text-[20px] font-bold leading-[1.3] tablet:text-xl tablet:leading-[1.1]">
        소개 이미지
      </label>
      <FileInput id="sub" images={subImages} editImages={editImages} onClear={clearSubImage} onChange={handleSubImages} accept="image/*" multiple />
      <span className="break-keep pl-2 text-lg leading-[1.4] text-gray-700">*이미지는 최대 4개까지 등록 가능합니다.</span>
      <CommonModal isOpen={imageLimitModal} onClose={handleModalState}>
        이미지는 최대 4개 첨부 가능합니다.
      </CommonModal>
      <CommonModal isOpen={modalState.isOpen} onClose={closeModal}>
        {modalState.message}
      </CommonModal>
    </div>
  );
}

export default IntroduceImage;
