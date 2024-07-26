import Input from '@/_components/input';
import Textarea from '@/_components/textarea';

function TestPage() {
  return (
    <form className="grid gap-5 px-5 py-5">
      <div className="grid gap-4">
        <label htmlFor="email">이메일</label>
        <Input id="email" type="email" placeholder="이메일을 입력해 주세요" />
      </div>
      <div className="grid gap-4">
        <label htmlFor="text">텍스트</label>
        <Input id="text" type="text" placeholder="이름을 입력해 주세요" />
      </div>
      <div className="grid gap-4">
        <label htmlFor="password">비밀번호</label>
        <Input id="password" type="password" placeholder="비밀번호를 입력해 주세요" />
      </div>
      <div className="grid gap-4">
        <label htmlFor="password2">비밀번호</label>
        <Input id="password2" type="password" placeholder="비밀번호를 입력해 주세요" />
      </div>
      <div className="grid gap-4">
        <label htmlFor="email2">에러 테스트</label>
        <Input id="email2" type="email" placeholder="이메일을 입력해주세요" error />
      </div>
      <div className="grid gap-4">
        <label htmlFor="text2">포커스 테스트</label>
        <Input id="text2" type="text" placeholder="이름을 입력해 주세요" />
      </div>
      <div className="grid gap-4">
        <label htmlFor="big">textarea big</label>
        <Textarea id="big" placeholder="이름을 입력해 주세요" size="big" />
      </div>
      <div className="grid gap-4">
        <label htmlFor="small">textarea small</label>
        <Textarea id="small" placeholder="이름을 입력해 주세요" size="small" />
      </div>
    </form>
  );
}

export default TestPage;
