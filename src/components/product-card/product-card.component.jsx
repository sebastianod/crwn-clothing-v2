import "./product-card.styles.scss";
import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../context/cart.context"; //we want the addItemToCart function from here

const ProductCard = ({productTape: product}) => {
    const {name, price, imageUrl} = product; //destructuring product
    const { addItemToCart } = useContext(CartContext);

    const addToCart = () => addItemToCart(product);
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addToCart}>Add to cart</Button>
    </div>
  );
};

export default ProductCard;

// "id": 1,
// "name": "Brown Brim",
// "imageUrl": "https://i.ibb.co/ZYW3VTp/brown-brim.png",
// "price": 25