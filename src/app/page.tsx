import Cart from '@/components/Cart';
import Menu from '@/components/Menu';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-cool-grey-50 text-cool-grey-900">
      <section className="flex min-h-screen flex-col items-center justify-between w-full p-6">
        <Menu />
        <Cart />
      </section>
    </main>
  );
}
