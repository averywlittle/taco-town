import Cart from '@/components/Cart';
import Menu from '@/components/Menu';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Menu />
      <Cart />
    </main>
  );
}
