import './checkout-item.styles.scss';

const CheckoutItem = ({ checkoutItem, handleFunctions }) => {
  const { name, imageUrl, price, quantity } = checkoutItem;

  const { addProductToCart, deleteProductFromCart, clearProductFromCart } =
    handleFunctions;

  const addItemHandler = () => addProductToCart(checkoutItem);
  const removeItemHandler = () => deleteProductFromCart(checkoutItem);
  const clearItemHandler = () => clearProductFromCart(checkoutItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name"> {name} </span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItemHandler()}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItemHandler()}>
          &#10095;
        </div>
      </span>
      <span className="price"> {price}</span>
      <div className="remove-button" onClick={() => clearItemHandler()}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
