import SHOP_DATA from "../../shop-data.json";
import { useContext } from "react";
import { ProductsContext } from "../context/products.context"; //To use our fetched products
import ProductCard from "../product-card/product-card.component";
import "./shop.styles.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products.map((product) => {//each object in products we just named product
        const {id} = product;
        return (
          <ProductCard productTape={product} key={id}/>
        );
      })}
    </div>
  );
};

export default Shop;
