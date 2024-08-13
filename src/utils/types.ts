export type MenuItem = {
  id: string;
  name: string;
  category: 'Tacos' | 'Drinks';
  price: number;
  discount_percent?: number;
  discount_threshold?: number;
};

export type CartItem = {
  id: string;
  name: string;
  category: 'Tacos' | 'Drinks';
  price: number;
  quantity: number;
};
