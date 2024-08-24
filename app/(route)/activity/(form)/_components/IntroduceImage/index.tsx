'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { Activity, ActivityEdit, EditDetail, SubImage } from '@/_types/activities/form.types';

import useModalState from '@/_hooks/useModalState';
import { usePostImage } from '@/_hooks/usePostImage';

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
 * IntroduceImage 컴포넌트는 사용자가 소개 이미지를 업로드하고, 이를 폼 데이터에 반영하는 기능을 제공합니다.
 * 이 컴포넌트는 체험 등록 및 체험 수정 페이지에서 사용되며, 최대 4개의 이미지를 업로드할 수 있습니다.
 *
 * @param {boolean} [edit] - 체험 수정 페이지에서 사용되는 경우, true로 설정됩니다.
 * @param {SubImage[]} [editValue] - 체험 수정 페이지의 기존 이미지 배열입니다.
 * @param {Dispatch<SetStateAction<EditDetail>>} [setEditDetailData] - 체험 수정 페이지에서 화면에 렌더링되는 데이터를 업데이트하는 함수입니다.
 * @param {Dispatch<SetStateAction<ActivityEdit>>} [setEditFormData] - 체험 수정 페이지의 폼 데이터를 업데이트하는 함수입니다.
 * @param {Dispatch<SetStateAction<Activity>>} [setRegisterFormData] - 체험 등록 페이지의 폼 데이터를 업데이트하는 함수입니다.
 */
function IntroduceImage({ edit, editValue, setRegisterFormData, setEditFormData, setEditDetailData }: IntroduceImage) {
  const router = useRouter();
  const [subImages, setSubImages] = useState<string[]>([]);
  const [pendingImageUrls, setPendingImageUrls] = useState<string[]>([]);
  const [editImages, setEditImages] = useState<SubImage[]>(editValue || []);
  const [imageCount, setImageCount] = useState(0);
  const { modalState, setModalState, activeCloseModal } = useModalState();

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
        if (setEditDetailData && setEditFormData) {
          setPendingImageUrls((prev) => prev.filter((img) => img !== image));
          setEditImages(filteredImages);
          setEditFormData((prev) => ({
            ...prev,
            subImageUrlsToAdd: pendingImageUrls,
          }));
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
      setPendingImageUrls((prev) => [...prev, res]);
    } else {
      setSubImages((prev) => [...prev, res]);
    }
  };

  const activityMutation = usePostImage({ router, setModalState, callback: getResponse });

  const handleSubUpload = (fileList: FileList) => {
    setImageCount(fileList.length);
    const imageLength = fileList.length + subImages.length + editImages.length;

    if (imageLength > 4) {
      setModalState((prev) => ({
        ...prev,
        isOpen: true,
        message: '이미지는 최대 4개 첨부 가능합니다.',
      }));
    } else {
      const filesArray = Array.from(fileList);

      filesArray.forEach((file, idx) => {
        if (fileList) {
          const json = new FormData();
          json.set('image', fileList[idx]);
          activityMutation.mutate(json);
        }
      });
    }
  };

  const handleSubImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleSubUpload(e.target.files);
    }
  };

  const handleDropImage: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleSubUpload(e.dataTransfer.files);
    }
  };

  useEffect(() => {
    if (setEditFormData) {
      setEditFormData((prev) => ({
        ...prev,
        subImageUrlsToAdd: pendingImageUrls,
      }));
    }
  }, [pendingImageUrls, setEditFormData]);

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
        onDrop={handleDropImage}
        multiple
      />
      <span className="break-keep pl-2 text-2lg leading-[1.4] text-gray-700">*이미지는 최대 4개까지 등록 가능합니다.</span>
      <CommonModal isOpen={modalState.isOpen} activeCloseModal={activeCloseModal}>
        {modalState.message}
      </CommonModal>
    </div>
  );
}

export default IntroduceImage;
