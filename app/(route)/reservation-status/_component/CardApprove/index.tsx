export default function CardApprove() {
  return (
    <div className="mt-4 w-[381px] border p-4">
      <div className="flex gap-[10px]">
        <p className="text-lg text-gray-600">닉네임</p>
        <p className="text-lg">정만철</p>
      </div>
      <div className="flex gap-[10px]">
        <p className="text-lg text-gray-600">인원</p>
        <p className="text-lg">12명</p>
      </div>
      <div className="text-md text-right font-SpoqaHanSans">
        <span className="rounded-[26.5px] bg-orange-200 px-[15px] py-[10px] text-right font-bold text-orange-500">예약 승인</span>
      </div>
    </div>
  );
}
