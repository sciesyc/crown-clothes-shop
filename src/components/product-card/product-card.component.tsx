import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';

import { addProductToCart } from '../../store/cart/cart.action';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { CategoryItem } from '../../store/categories/category.types';

import {
  Footer,
  Name,
  Price,
  ProductCardContainer,
} from './product-card.styles';

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
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
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={handleProductButton}
      >
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
