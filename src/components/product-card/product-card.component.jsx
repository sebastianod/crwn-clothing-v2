import "./product-card.styles.scss";
import Button from "../button/button.component";

const ProductCard = ({productTape}) => {
    const {name, price, imageUrl} = productTape; //destructuring product

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted">Add to cart</Button>
    </div>
  );
};

export default ProductCard;

// "id": 1,
// "name": "Brown Brim",
// "imageUrl": "https://i.ibb.co/ZYW3VTp/brown-brim.png",
// "price": 25