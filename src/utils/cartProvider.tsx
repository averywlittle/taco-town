'use client';

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { CartItem, MenuItem } from './types';

type CartContextType = {
  order: MenuItem[];
  setOrder: Dispatch<SetStateAction<MenuItem[]>>;
  cart: CartItem[];
  total: number;
};

export const CartContext = createContext<CartContextType>({
  order: [],
  setOrder: () => undefined,
  cart: [],
  total: 0,
});

export const useCart = (): CartContextType => {
  return useContext(CartContext);
};

export const CartContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [order, setOrder] = useState<MenuItem[]>([]);

  const cart = order.reduce((cartItems: CartItem[], item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }
    return cartItems;
  }, []);

  const total = order.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ order, setOrder, cart, total }}>{children}</CartContext.Provider>
  );
};
