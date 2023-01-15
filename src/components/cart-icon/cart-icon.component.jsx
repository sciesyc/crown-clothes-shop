import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../context/cart.context';

import './cart-icon.styles.scss';

const CartIcon = ({ products }) => {
  const { isCartOpen, setIsCartOpen, cartProducts, cartCount } =
    useContext(CartContext);

  console.log('cartProducts', cartProducts);
  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className={`cart-icon-container`} onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
