import Cart from '@/components/Cart';
import Menu from '@/components/Menu';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-cool-grey-50 text-cool-grey-900">
      <section className="flex min-h-screen flex-col items-center justify-between p-24">
        <Menu />
        <Cart />
      </section>
    </main>
  );
}
