'use client';

import { useExampleStore } from '@/_stores/useExampleStore';

export default function ExampleZustand() {
  const bears = useExampleStore.use.bear();
  const setBear = useExampleStore.use.setBear();
  return (
    <>
      {bears} around here...
      <button
        onClick={() => {
          setBear((prevBear) => prevBear + 1);
        }}
        type="button"
      >
        one up
      </button>
    </>
  );
}
