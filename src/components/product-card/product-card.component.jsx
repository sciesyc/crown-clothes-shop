import { useDispatch, useSelector } from 'react-redux';

import { addProductToCart } from '../../store/cart/cart.action';
import Button from '../button/button.component';

import {
  Footer,
  Name,
  Price,
  ProductCardContainer,
} from './product-card.styles.jsx';
import { selectCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleProductButton = () =>
    dispatch(addProductToCart(cartItems, product));

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
