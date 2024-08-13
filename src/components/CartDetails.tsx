'use client';

import { useCart } from '@/utils/cartProvider';
import { useRouter } from 'next/navigation';

const CartDetails = () => {
  const { cart, total } = useCart();
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div key={item.id + 'cart'}>
            {item.name} x{item.quantity}
          </div>
        ))}
        <p>Total: ${total}</p>
      </div>
    </div>
  );
};

export default CartDetails;
