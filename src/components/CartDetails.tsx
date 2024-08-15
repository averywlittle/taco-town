'use client';

import { useCart } from '@/utils/cartProvider';

const CartDetails = () => {
  const { cart, total } = useCart();

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col w-full">
          {cart.map((item) => (
            <div className={'flex justify-between items-center px-2 py-2'} key={item.id + 'cart'}>
              <span className="pr-2">
                {item.name} x{item.quantity}
              </span>
              <span className="flex-grow border-b border-dotted border-black mx-2 -mb-2"></span>
              <span className="pl-2">${item.quantity * item.price}</span>
            </div>
          ))}
        </div>
        <div id="cart-total">
          <p>Total</p>
          <p className="font-semibold">${total}</p>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
