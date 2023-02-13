import { useContext } from 'react';

import Button from '../button/button.component';
import { CartContext } from '../../context/cart.context';

import './product-card.styles.scss';

const ProductCard = ({ product }) => {
  console.log('product', product);
  const { name, price, imageUrl } = product;

  const { addProductToCart } = useContext(CartContext);

  const handleProductButton = () => {
    addProductToCart(product);
  };

  return (
    <div className="product-card-container">
      <img src={`${imageUrl}`} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={handleProductButton}>
        Add to card
      </Button>
    </div>
  );
};

export default ProductCard;
