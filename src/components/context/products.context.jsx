import { useState, createContext, useEffect } from 'react';
import SHOP_PRODUCTS from '../../shop-data.json';

export const ProductsContext = createContext({
  products: [],
  setCurrentProducts: () => {},
});

export const ProductsProvider = ({ children }) => {
  const [products, setCurrentProducts] = useState(null);

  const value = { products, setCurrentProducts };

  useEffect(() => {
    if (SHOP_PRODUCTS) {
      setCurrentProducts(SHOP_PRODUCTS);
    }
  }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
