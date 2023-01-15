import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, itemToAdd) => {
  const existingItem = cartItems.find((el) => el.id === itemToAdd.id);

  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  cartProducts: [],
  addProductToCart: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartCount: 0,
});

const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartProducts.reduce(
      (total, currentItem) => total + currentItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartProducts]);

  const addProductToCart = (productToAdd) => {
    setCartProducts(addCartItem(cartProducts, productToAdd));
  };

  const value = {
    cartProducts,
    addProductToCart,
    isCartOpen,
    setIsCartOpen,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
