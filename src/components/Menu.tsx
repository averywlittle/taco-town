'use client';

import { useQuery } from '@tanstack/react-query';
import { TACO_TOWN_API } from '../utils/constants';
import { MenuItem } from '@/utils/types';
import { useCart } from '@/utils/cartProvider';

const fetchMenu = async (): Promise<MenuItem[]> => {
  const response = await fetch(`${TACO_TOWN_API}/menu`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Menu = () => {
  const { order, setOrder } = useCart();
  const { data: menu, isLoading } = useQuery({
    queryKey: ['MENU'],
    queryFn: fetchMenu,
  });

  console.log(order);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {menu?.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => setOrder((prevOrder) => [...prevOrder, item])}
          >
            <h3 className="font-bold">{item.name}</h3>
            <p className="mt-2">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
