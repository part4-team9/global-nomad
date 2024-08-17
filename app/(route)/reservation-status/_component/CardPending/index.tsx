import Button from '@/_components/button';

export default function CardPending () {

  return(
    <div className="w-[381px] border mt-4 p-4">
    <div className='flex gap-[10px]'>
      <p>닉네임</p>
      <p>정만철</p>
    </div>
    <div className='flex gap-[10px]'>
      <p>인원</p>
      <p>12명</p>
    </div>
    <div className='text-right'>
    <Button className="px-[15px] py-[10px]" variant="black">
      승인하기
    </Button>
    <Button className="px-[15px] py-[10px] ml-[6px]" variant="white">
      거절하기
    </Button>
    </div>
  </div>
  )
}