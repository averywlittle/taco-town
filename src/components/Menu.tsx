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
  const { data: menu, isPending } = useQuery({
    queryKey: ['MENU'],
    queryFn: fetchMenu,
  });

  const addItem = (menuItem: MenuItem) => {
    setOrder((prevOrder) => [...prevOrder, menuItem]);
  };

  const removeItem = (menuItem: MenuItem) => {
    const index = order.findIndex((item) => item.id === menuItem.id);
    if (index !== -1) {
      const newOrder = [...order.slice(0, index), ...order.slice(index + 1)];
      setOrder(newOrder);
    }
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {menu?.map((menuItem) => (
          <div
            key={menuItem.id}
            className="p-4 border rounded shadow hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <h3 className="font-bold">{menuItem.name}</h3>
            <p className="mt-2">${menuItem.price.toFixed(2)}</p>
            <button className="p-2 m-2 bg-slate-700" onClick={() => addItem(menuItem)}>
              +
            </button>
            <button className="p-2 m-2 bg-slate-700" onClick={() => removeItem(menuItem)}>
              -
            </button>
            <div>{order?.filter((item) => item.id === menuItem.id).length}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
