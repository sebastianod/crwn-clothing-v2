import { createContext, useState } from "react";
import PRODUCTS from "../../shop-data.json"; //default products

export const ProductsContext = createContext({
  // setCurrentProduct: () => null,
  products: [], //list of products
});

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);//PRODUCTS set as default before fetching
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>{children} </ProductsContext.Provider>
  );
};

export default ProductsProvider;
