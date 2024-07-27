'use client';

import Input from '@/_components/input';
import SelectBox from '@/_components/select-box';
import Textarea from '@/_components/textarea';

function TestPage() {
  const values = ['문화 예술', '식음료', '스포츠'];

  const handleChange = () => {
    console.log('test');
  };

  return (
    <form className="mb-20 grid gap-5 px-5 py-5">
      <div className="grid gap-4">
        <label htmlFor="email">이메일</label>
        <Input id="email" type="email" onChange={handleChange} placeholder="이메일을 입력해 주세요" />
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
      <div className="grid gap-4">
        <label htmlFor="select">select box</label>
        <SelectBox id="select" placeholder="카테고리" values={values} />
      </div>
      <div className="grid gap-4">
        <label htmlFor="select2">select box</label>
        <SelectBox id="select2" head="체험명" placeholder="카테고리" values={values} />
      </div>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias mollitia molestiae incidunt repellendus veniam, atque reiciendis perferendis eos
        numquam laboriosam aliquid voluptatum officiis officia praesentium nulla cum! Sed provident reiciendis nemo modi nesciunt? Dolores rerum sequi quibusdam
        aliquam. Quibusdam tempora hic quos aspernatur debitis, quo, dolorem cumque expedita sed enim libero odit corrupti laboriosam? Minus nisi a sequi velit
        ipsam aspernatur ad quia et. Voluptates perspiciatis temporibus dolorum, quam sint, tenetur labore porro quia sed vel rerum voluptate atque odio?
      </div>
    </form>
  );
}

export default TestPage;
