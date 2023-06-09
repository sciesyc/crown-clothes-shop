import { createAction } from '../../utils/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

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

export const setIsCartOpen = (isCartOpen) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);

export const addProductToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteProductFromCart = (cartItems, productToDelete) => {
  const newCartItems = deleteCartItem(cartItems, productToDelete);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearProductFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
