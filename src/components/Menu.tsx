'use client';

import { useQuery } from '@tanstack/react-query';
import { EXTRA_DATA, TACO_TOWN_API } from '../utils/constants';
import { MenuItem } from '@/utils/types';
import { useCart } from '@/utils/cartProvider';
import Image from 'next/image';
import { HandThumbUpIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const fetchMenu = async (): Promise<MenuItem[]> => {
  const response = await fetch(`${TACO_TOWN_API}/menu`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Menu = () => {
  const { order, setOrder, total } = useCart();
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
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col w-full md:w-5/6 mb-36">
        <h3 className="font-bold text-lg pb-12">Menu</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {menu?.map((menuItem) => {
            const { description, image, percent } =
              EXTRA_DATA[menuItem?.id as keyof typeof EXTRA_DATA];
            return (
              <div
                key={menuItem.id}
                className="h-full lg:h-52 flex border rounded-xl shadow hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-full flex flex-col p-4 justify-between">
                  <div>
                    <h3 className="font-bold">{menuItem.name}</h3>
                    <p className="w-10/12 md:w-7/12">{description}</p>
                  </div>
                  <div>
                    <div className="flex items-center mt-2 gap-2">
                      <p className="font-semibold">${menuItem.price.toFixed(2)}</p>
                      <div className="flex">
                        <HandThumbUpIcon className="h-6 w-6 stroke-cool-grey-900" />
                        {percent}%
                      </div>
                    </div>
                    <div className="mt-2">
                      x{order?.filter((item) => item.id === menuItem.id).length}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute top-0 right-0 lg:w-36 xl:w-56 h-full lg:h-52">
                    <Image
                      src={image}
                      alt={menuItem.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-r-xl hidden lg:block"
                    />
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <button
                        className="flex justify-center items-center h-8 w-8 rounded-full bg-cool-grey-50 drop-shadow"
                        onClick={() => addItem(menuItem)}
                      >
                        <PlusIcon className="h-4 w-4 stroke-cool-grey-900" />
                      </button>
                      <button
                        className="flex justify-center items-center h-8 w-8 rounded-full bg-cool-grey-50 drop-shadow"
                        onClick={() => removeItem(menuItem)}
                      >
                        <MinusIcon className="h-4 w-4 stroke-cool-grey-900" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-0 w-full py-4 px-6 bg-cool-grey-50 border-t-2 border-t-cool-grey-100">
        <div className="flex justify-center">
          <div className="w-full md:w-5/6 flex justify-between items-center">
            <div>
              <p>Total</p>
              <p className="font-semibold">${total}</p>
            </div>
            <Link href="/checkout">
              <button className="flex justify-center items-center h-12 w-42 bg-cool-grey-50 p-4 cursor-pointer drop-shadow rounded-2xl">
                View Your Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
