import CommonLayout from '@/_components/common-layout';
import StickyLayout from '@/_components/side-sticky-layout';
import { getCookie } from '@/_utils/cookie';
import { redirect } from 'next/navigation';
import MyAccountClient from './_components/MyAccountClient';

/**
 * MyAccount
 *
 * 사용자의 정보를 수정할 수 있는 페이지입니다.
 * - `authConfirm` 쿠키(비밀번호 확인)가 존재하지 않으면, 비밀번호 확인 페이지(`/my/account/confirm`)로 리디렉션합니다.
 * - 비밀번호 확인이 완료된 경우, 내 정보 수정 페이지를 렌더링합니다.
 */
async function MyAccount() {
  const cookie = await getCookie('authConfirm');

  if (!cookie) {
    redirect('/my/account/confirm');
  }

  return (
    <CommonLayout>
      <StickyLayout>
        <MyAccountClient />
      </StickyLayout>
    </CommonLayout>
  );
}

export default MyAccount;
