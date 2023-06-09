import { useDispatch, useSelector } from 'react-redux';

import {
  addProductToCart,
  clearProductFromCart,
  deleteProductFromCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector.js';

import {
  CheckoutItemContainer,
  ImageItemContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles.jsx';

const CheckoutItem = ({ checkoutItem }) => {
  const { name, imageUrl, price, quantity } = checkoutItem;

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const addItemHandler = () =>
    dispatch(addProductToCart(cartItems, checkoutItem));
  const removeItemHandler = () =>
    dispatch(deleteProductFromCart(cartItems, checkoutItem));
  const clearItemHandler = () =>
    dispatch(clearProductFromCart(cartItems, checkoutItem));

  return (
    <CheckoutItemContainer>
      <ImageItemContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageItemContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
