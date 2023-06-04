import { useContext, useEffect } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../context/cart.context';

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './checkout.style.jsx';

const Checkout = () => {
  const {
    cartItems,
    addProductToCart,
    deleteProductFromCart,
    clearProductFromCart,
    cartTotal,
    setIsCartOpen,
  } = useContext(CartContext);

  useEffect(() => setIsCartOpen(false), [setIsCartOpen]);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems?.length ? (
        cartItems.map((cartItem) => (
          <CheckoutItem
            key={cartItem.id}
            checkoutItem={cartItem}
            handleFunctions={{
              addProductToCart,
              deleteProductFromCart,
              clearProductFromCart,
            }}
          />
        ))
      ) : (
        <span>your cart is empty</span>
      )}
      <Total>TOTAL: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
