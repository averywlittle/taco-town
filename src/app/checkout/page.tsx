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
    onError: (error) => console.log('Submit Order Error: ', error),
  });

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="w-full flex justify-center">
      <div className="w-1/4 flex flex-col gap-4">
        <p>Enter a name for the order:</p>
        <input
          type="text"
          onChange={(e) => {
            console.log(e.target.value);
            setName(e.target.value);
          }}
          className="text-slate-800"
          value={name}
        />
        <CartDetails />
        <button onClick={() => submitOrder()} className="p-4 bg-slate-600">
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
