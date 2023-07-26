import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from '../../utils/reducer/reducer.utils';
import { CategoryItem } from '../categories/category.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';

const addCartItem = (
  cartItems: CartItem[],
  itemToAdd: CategoryItem
): CartItem[] => {
  const existingCartItem = cartItems.find((el) => el.id === itemToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

const deleteCartItem = (
  cartItems: CartItem[],
  itemTodelete: CartItem
): CartItem[] => {
  //find the cart item to delete
  const existingCartItem = cartItems.find((el) => el.id === itemTodelete.id);

  //check if quantity is equal to 1, delete that item from the cart
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== itemTodelete.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === itemTodelete.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (
  cartItems: CartItem[],
  clearedItem: CartItem
): CartItem[] => {
  return [...cartItems].filter((cartItem) => cartItem.id !== clearedItem.id);
};

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (isCartOpen: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addProductToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const deleteProductFromCart = (
  cartItems: CartItem[],
  productToDelete: CartItem
) => {
  const newCartItems = deleteCartItem(cartItems, productToDelete);
  return setCartItems(newCartItems);
};

export const clearProductFromCart = (
  cartItems: CartItem[],
  productToClear: CartItem
) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return setCartItems(newCartItems);
};
