'use client';

import { useRouter } from 'next/navigation';
import CartDetails from './CartDetails';

const Cart = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col gap-4 m-6">
        <h4 className="text-2xl">Your Order</h4>
        <CartDetails />
        <button onClick={() => router.push('/checkout')} className="p-4 bg-slate-600">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
