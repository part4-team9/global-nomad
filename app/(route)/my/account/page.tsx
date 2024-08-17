import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';

function MyAccount() {
  return (
    <CommonLayout>
      <StickyLayout>
        <div>내 정보 수정 페이지</div>
      </StickyLayout>
    </CommonLayout>
  );
}

export default MyAccount;
