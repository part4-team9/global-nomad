import ExampleAxios from './_components/example-axios';
import ExampleZustand from './_components/example-zustand';
import Header from './_components/header';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <ExampleZustand />
      <ExampleAxios />
      
      <Header></Header>
    </main>
  );
}
