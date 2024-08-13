'use client';

import { useCart } from '@/utils/cartProvider';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const { cart, total } = useCart();
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col gap-4 m-6">
        <h4 className="text-2xl">Your Order</h4>
        {cart.map((item) => (
          <div key={item.id + 'cart'}>
            {item.name} x{item.quantity}
          </div>
        ))}
        ${total}
        <button onClick={() => router.push('/checkout')} className="p-4 bg-slate-600">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
