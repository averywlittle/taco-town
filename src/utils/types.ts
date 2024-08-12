export type MenuItem = {
  id: string;
  name: string;
  category: 'Tacos' | 'Drinks';
  price: number;
  discount_percent?: number;
  discount_threshold?: number;
};
