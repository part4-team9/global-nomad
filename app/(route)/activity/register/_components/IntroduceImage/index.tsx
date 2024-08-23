'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Activity, ActivityEdit, EditDetail, SubImage } from '@/_types/activities/form.types';

import { usePostImage } from '@/_hooks/use-post-image';
import useModalState from '@/_hooks/useModalState';

import CommonModal from '../CommonModal';
import FileInput from '../FileInput';

interface IntroduceImage {
  edit?: boolean;
  editValue?: SubImage[];
  setEditDetailData?: Dispatch<SetStateAction<EditDetail>>;
  setEditFormData?: Dispatch<SetStateAction<ActivityEdit>>;
  setRegisterFormData?: Dispatch<SetStateAction<Activity>>;
}

/**
 * 소개 이미지 업로드 및 form 업데이트하는 컴포넌트입니다.
 * @param edit 체험 수정 페이지 여부 boolean 값
 * @param editValue 체험 수정 페이지의 경우 기존 default 값
 * @param setRegisterFormData 체험 등록 페이지 form setState 함수
 * @param setEditFormData 체험 수정 페이지 form setState 함수
 * @param setEditDetailData 체험 수정 페이지 화면 렌더링위한 setState 함수
 */
function IntroduceImage({ edit, editValue, setRegisterFormData, setEditFormData, setEditDetailData }: IntroduceImage) {
  const router = useRouter();
  const [subImages, setSubImages] = useState<string[]>([]);
  const [imageStore, setImageStore] = useState<string[]>([]);
  const [editImages, setEditImages] = useState<SubImage[]>(editValue || []);
  const [imageCount, setImageCount] = useState(0);
  const { modalState, setModalState, closeModal } = useModalState();

  const clearSubImage = (image: string, id?: number) => {
    if (edit) {
      if (id) {
        if (setEditFormData && setEditDetailData) {
          setEditFormData((prev) => ({
            ...prev,
            subImageIdsToRemove: [...prev.subImageIdsToRemove, id],
          }));
          const updatedImages = editImages.filter((data) => data.id !== id);
          setEditImages(updatedImages);
          setEditDetailData((prev) => ({
            ...prev,
            subImages: updatedImages,
          }));
        }
      } else {
        const filteredImages = editImages.filter((data) => data.imageUrl !== image);
        if (setEditDetailData) {
          setImageStore((prev) => prev.filter((img) => img !== image));
          setEditImages(filteredImages);
          setEditDetailData((prev) => ({
            ...prev,
            subImages: filteredImages,
          }));
        }
      }
    } else {
      setSubImages((prev) => prev.filter((img) => img !== image));
    }
  };

  const getResponse = (res: string) => {
    if (editValue && setEditFormData && setEditDetailData) {
      setEditImages((prev) => [...prev, { imageUrl: res }]);
      setEditFormData((prev) => ({
        ...prev,
        subImageUrlsToAdd: [...prev.subImageUrlsToAdd, res],
      }));
      setEditDetailData((prev) => ({
        ...prev,
        subImages: [...prev.subImages, { imageUrl: res }],
      }));
      setImageStore((prev) => [...prev, res]);
    } else {
      setSubImages((prev) => [...prev, res]);
    }
  };

  const activityMutation = usePostImage({ router, setModalState, callback: getResponse });

  const handleSubImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageCount(e.target.files.length);
      const imageLength = e.target.files.length + subImages.length + editImages.length;

      if (imageLength > 4) {
        setModalState((prev) => ({
          ...prev,
          isOpen: true,
          message: '이미지는 최대 4개 첨부 가능합니다.',
        }));
      } else {
        const filesArray = Array.from(e.target.files);

        filesArray.forEach((file, idx) => {
          if (e.target.files) {
            const json = new FormData();
            json.set('image', e.target.files[idx]);
            activityMutation.mutate(json);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (setEditFormData) {
      setEditFormData((prev) => ({
        ...prev,
        subImageUrlsToAdd: imageStore,
      }));
    }
  }, [imageStore, setEditFormData]);

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
  }, [subImages, setRegisterFormData]);

  useEffect(() => {
    if (editValue) {
      setEditImages(editValue);
    }
  }, [editValue]);

  return (
    <div className="grid gap-6">
      <label htmlFor="sub" className="w-fit text-xl font-bold leading-[1.3] tablet:text-2xl tablet:leading-[1.1]">
        소개 이미지
      </label>
      <FileInput
        id="sub"
        isPending={activityMutation.isPending}
        count={imageCount}
        images={subImages}
        editImages={editImages}
        onClear={clearSubImage}
        onChange={handleSubImages}
        accept="image/*"
        multiple
      />
      <span className="break-keep pl-2 text-2lg leading-[1.4] text-gray-700">*이미지는 최대 4개까지 등록 가능합니다.</span>
      <CommonModal isOpen={modalState.isOpen} onClose={closeModal}>
        {modalState.message}
      </CommonModal>
    </div>
  );
}

export default IntroduceImage;
