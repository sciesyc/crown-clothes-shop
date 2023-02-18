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

const deleteCartItem = (cartItems, itemTodelete) => {
  const existingItem = cartItems.find((el) => el.id === itemTodelete.id);

  if (itemTodelete.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== itemTodelete.id);
  }

  if (existingItem.quantity > 1) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemTodelete.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

const clearCartItem = (cartItems, clearedItem) => {
  return [...cartItems].filter((cartItem) => cartItem.id !== clearedItem.id);
};

export const CartContext = createContext({
  cartProducts: [],
  addProductToCart: () => {},
  deleteProductFromCart: () => {},
  clearProductItems: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartProducts.reduce(
      (total, currentItem) => total + currentItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartProducts]);

  useEffect(() => {
    const newCartTotal = cartProducts.reduce(
      (total, currentItem) => total + currentItem.price * currentItem.quantity,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartProducts]);

  const addProductToCart = (productToAdd) => {
    setCartProducts(addCartItem(cartProducts, productToAdd));
  };

  const deleteProductFromCart = (productToDelete) => {
    setCartProducts(deleteCartItem(cartProducts, productToDelete));
  };

  const clearProductFromCart = (productToClear) => {
    setCartProducts(clearCartItem(cartProducts, productToClear));
  };

  const value = {
    cartProducts,
    addProductToCart,
    deleteProductFromCart,
    clearProductFromCart,
    isCartOpen,
    setIsCartOpen,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
