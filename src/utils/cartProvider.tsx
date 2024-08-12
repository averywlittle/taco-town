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
import { MenuItem } from './types';

type CartContextType = {
  order: MenuItem[];
  setOrder: Dispatch<SetStateAction<MenuItem[]>>;
};

export const CartContext = createContext<CartContextType>({
  order: [],
  setOrder: () => undefined,
});

export const useCart = (): CartContextType => {
  return useContext(CartContext);
};

export const CartContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [order, setOrder] = useState<MenuItem[]>([]);
  return <CartContext.Provider value={{ order, setOrder }}>{children}</CartContext.Provider>;
};
