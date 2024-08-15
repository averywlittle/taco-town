'use client';

import { useMutation } from '@tanstack/react-query';
import { TACO_TOWN_API } from '../../utils/constants';
import { OrderResponse } from '@/utils/types';
import CartDetails from '@/components/CartDetails';
import { useState } from 'react';
import { useCart } from '@/utils/cartProvider';

const Checkout = () => {
  const { cart, total } = useCart();
  const [name, setName] = useState('');
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);

  const isCheckoutDisabled = name.length === 0;

  const { mutate: submitOrder, isPending } = useMutation({
    mutationFn: async (): Promise<OrderResponse> => {
      const response = await fetch(`${TACO_TOWN_API}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: name,
          totalPrice: total,
          orderItems: cart,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: () => setIsOrderSubmitted(true),
    onError: (error) => console.log('Submit Order Error: ', error),
  });

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="w-full flex justify-center text-cool-grey-900 mt-16 px-6">
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {isOrderSubmitted ? (
          <div className="w-full rounded-2xl bg-orange-vivid-100/80 px-6 py-4">
            Your order was submitted successfully! It should arrive in 36 min.
          </div>
        ) : null}
        <p>Enter a name for the order:</p>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="text-cool-grey-900 bg-cool-grey-100/80 rounded-2xl py-2 px-4 outline-orange-400"
          value={name}
        />
        <CartDetails />
        {isCheckoutDisabled ? (
          <button className="flex justify-center items-center h-12 w-42 border-2 bg-cool-grey-400 text-cool-grey-100 font-semibold p-4 rounded-2xl">
            Submit Order
          </button>
        ) : (
          <button
            onClick={() => submitOrder()}
            className="flex justify-center items-center h-12 w-42 bg-orange-vivid-500 hover:bg-orange-vivid-600 text-cool-grey-50 font-semibold p-4 cursor-pointer drop-shadow rounded-2xl"
          >
            Submit Order
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
