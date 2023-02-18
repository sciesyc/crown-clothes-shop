import { useContext } from 'react';

import Button from '../button/button.component';
import { CartContext } from '../../context/cart.context';

import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from './product-card.styles.jsx';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const { addProductToCart } = useContext(CartContext);

  const handleProductButton = () => {
    addProductToCart(product);
  };

  return (
    <ProductCardContainer>
      <img src={`${imageUrl}`} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType="inverted" onClick={handleProductButton}>
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
