'use client';

import { useState } from 'react';
import getMyActivities from '@/_apis/reservation/getMyActivities';
import { myActivitiesExample } from '@/_mocks/my-activities-example';
import { useQuery } from '@tanstack/react-query';

import type { ActivitiesResponse } from '@/_types';

import { useModal } from '@/_hooks/useModal';

import Button from '@/_components/button';
import CalendarNotice from '@/_components/calendar-notice';
import Modal from '@/_components/modal';
import SelectBox from '@/_components/select-box';

import NoReservation from '../NoReservation';
import RegisterStatusModal from '../RegisterStatusModal';

function RegisterStatusLayout() {
  const { isOpen, openModal, closeModal } = useModal();
  const [modalMessage, setModalMessage] = useState<string>('');

  const {
    data: myActivity,
    isLoading,
    error,
  } = useQuery<ActivitiesResponse>({
    queryKey: ['reservations'],
    queryFn: getMyActivities,
  });
  const reservations = myActivity?.activities || [];
  const selectBoxvalue: string[] = myActivitiesExample.map((ActivitiesExample) => ActivitiesExample.title);

  const handleDateSelect = (date: string) => {
    setModalMessage(`${date}의 예약: `);
    openModal();
  };

  const handleCloseModal = {
    closeModal(){}
  }


  // return reservations?.length === 0 ? (
  //   <>
  //     <h1 className="mb-6">예약 현황</h1>
  //     <NoReservation />
  //   </>
  // ) : (
  //   <>
  //     <h1 className="mb-6">예약 현황</h1>
  //     <div className="mb-[30px]">
  //       <SelectBox head="체험명" values={selectBoxvalue} />
  //     </div>
  //     <CalendarNotice />
  //   </>
  // );
  return (
    <>
      <h1 className="mb-6">예약 현황</h1>
      <div className="mb-[30px]">
        <SelectBox head="체험명" values={selectBoxvalue} />
      </div>
      <CalendarNotice onDateSelect={handleDateSelect} />
      <button type='button' onClick={openModal}>모달 오픈</button>

      <RegisterStatusModal isOpen={isOpen} onClose={closeModal} message={modalMessage} />

      {/* <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="m-auto px-[90px] pb-[28px] pt-[26px] text-right text-lg md:w-[540px] md:px-[33px]">
          <p className="pb-[43px] pt-[53px] text-center">{modalMessage}</p>
          <span className="flex justify-center md:justify-end">
            <Button className="h-[42px] w-[138px]" type="button" variant="black" onClick={closeModal}>
              확인
            </Button>
          </span>
        </div>
      </Modal> */}
    </>
  );
}

export default RegisterStatusLayout;
