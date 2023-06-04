import { createContext, useReducer } from 'react';

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
  cartItems: [],
  addProductToCart: () => {},
  deleteProductFromCart: () => {},
  clearProductItems: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        ...payload,
      };
    case 'SET_IS_CART_OPEN':
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

const CartProvider = ({ children }) => {
  const [{ cartItems, cartCount, cartTotal, isCartOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const setIsCartOpen = (isCartOpen) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isCartOpen });
  };

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, currentItem) => total + currentItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, currentItem) => total + currentItem.price * currentItem.quantity,
      0
    );

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      },
    });
  };

  const addProductToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);

    updateCartItemsReducer(newCartItems);
  };

  const deleteProductFromCart = (productToDelete) => {
    const newCartItems = deleteCartItem(cartItems, productToDelete);

    updateCartItemsReducer(newCartItems);
  };

  const clearProductFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);

    updateCartItemsReducer(newCartItems);
  };

  const value = {
    cartItems,
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
