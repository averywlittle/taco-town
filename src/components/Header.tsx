'use client';

import { useCart } from '@/utils/cartProvider';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const Header = () => {
  const { order, setIsCartOpen } = useCart();
  return (
    <div className="w-full flex justify-between py-6 px-4 md:px-16 border-b-2 border-b-cool-grey-100 bg-cool-grey-50 text-cool-grey-900">
      <Link href="/">
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="bg-orange-200 rounded-full w-14 h-14 text-4xl flex justify-center items-center">
            🌮
          </div>
          <div className="font-bold text-2xl">Taco Town</div>
        </div>
      </Link>
      <div
        onClick={() => setIsCartOpen((prev) => !prev)}
        className="bg-orange-vivid-500 hover:bg-orange-vivid-600 transition-colors duration-300 ease-in-out rounded-2xl w-16 h-12 flex justify-center items-center gap-2 text-cool-grey-50 cursor-pointer"
      >
        <ShoppingCartIcon className="h-6 w-6 stroke-cool-grey-50 fill-cool-grey-50" />
        {order.length}
      </div>
    </div>
  );
};

export default Header;
