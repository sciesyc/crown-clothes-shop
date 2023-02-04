import { useContext, useEffect } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../context/cart.context';

import './checkout.style.scss';

const Checkout = () => {
  const {
    cartProducts,
    addProductToCart,
    deleteProductFromCart,
    clearProductFromCart,
    cartTotal,
    setIsCartOpen,
  } = useContext(CartContext);

  useEffect(() => setIsCartOpen(false), [setIsCartOpen]);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartProducts.map((cartItem) => (
        <CheckoutItem
          key={cartItem.id}
          checkoutItem={cartItem}
          handleFunctions={{
            addProductToCart,
            deleteProductFromCart,
            clearProductFromCart,
          }}
        />
      ))}
      <div className="total">TOTAL: ${cartTotal}</div>
    </div>
  );
};

export default Checkout;
