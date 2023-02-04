import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartContext } from '../../context/cart.context';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const { cartProducts } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartProducts.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={() => navigate('/checkout')}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
