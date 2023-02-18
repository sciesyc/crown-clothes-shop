import {
  CheckoutItemContainer,
  ImageItemContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.styles.jsx';

const CheckoutItem = ({ checkoutItem, handleFunctions }) => {
  const { name, imageUrl, price, quantity } = checkoutItem;

  const { addProductToCart, deleteProductFromCart, clearProductFromCart } =
    handleFunctions;

  const addItemHandler = () => addProductToCart(checkoutItem);
  const removeItemHandler = () => deleteProductFromCart(checkoutItem);
  const clearItemHandler = () => clearProductFromCart(checkoutItem);

  return (
    <CheckoutItemContainer>
      <ImageItemContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageItemContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={() => removeItemHandler()}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={() => addItemHandler()}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={() => clearItemHandler()}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
