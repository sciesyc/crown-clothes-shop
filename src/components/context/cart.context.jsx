import { createContext, useState } from 'react';

export const CartContext = createContext({
  cartProducts: [],
  setCartProducts: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
});

const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const value = { cartProducts, setCartProducts, isCartOpen, setIsCartOpen };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
