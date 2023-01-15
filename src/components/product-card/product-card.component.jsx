import { useContext } from 'react';

import Button from '../button/button.component';
import { CartContext } from '../context/cart.context';

import './product-card.styles.scss';

const ProductComponent = ({ product, products }) => {
  const { name, price, imageUrl, id } = product;

  const { setCartProducts } = useContext(CartContext);

  const handleProductButton = (event) => {
    console.log('onCLick products: ', products);
    const product = products.find((prod) => prod.id === id);
    setCartProducts((prev) => [...prev, product]);
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

export default ProductComponent;
