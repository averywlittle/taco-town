'use client';

import { useQuery } from '@tanstack/react-query';

const URL = 'https://virtserver.swaggerhub.com/Detroit_Labs/Taco_Truck/1.0.0';

type MenuItem = {
  id: string;
  name: string;
  category: 'Tacos' | 'Drinks';
  price: number;
  discount_percent?: number;
  discount_threshold?: number;
};

const fetchMenu = async (): Promise<MenuItem[]> => {
  const response = await fetch(`${URL}/menu`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Menu = () => {
  const { data: menu, isLoading } = useQuery({
    queryKey: ['MENU'],
    queryFn: fetchMenu,
  });

  return (
    <div>
      {isLoading ? <div>Loading...</div> : null}
      {menu?.map((item) => item.name)}
    </div>
  );
};

export default Menu;
