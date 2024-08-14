'use client';

import CartDetails from './CartDetails';
import { useCart } from '@/utils/cartProvider';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const Cart = () => {
  const { isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="bg-gray-400/30 w-screen h-screen fixed top-0">
      <div className="hidden md:block w-2/3 h-full" onClick={() => setIsCartOpen(false)}></div>
      <div className="fixed top-0 right-0 w-full h-full lg:w-1/3 bg-cool-grey-50 border-l-2 border-l-cool-grey-100">
        <div className="flex flex-col gap-4 m-6">
          <div className="flex justify-between">
            <h4 className="text-2xl">Your Order</h4>
            <XMarkIcon
              className="h-6 w-6 stroke-cool-grey-800 cursor-pointer"
              onClick={() => setIsCartOpen(false)}
            />
          </div>
          <CartDetails />
          <div className="flex justify-center">
            <Link href="/checkout">
              <button className="flex justify-center items-center h-12 w-42 bg-orange-vivid-500 hover:bg-orange-vivid-600 text-cool-grey-50 font-semibold p-4 cursor-pointer drop-shadow rounded-2xl">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
