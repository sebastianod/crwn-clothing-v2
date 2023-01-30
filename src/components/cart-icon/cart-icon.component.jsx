import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import { useContext } from "react";
import { CartContext } from "../context/cart.context";


const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, totalItems } = useContext(CartContext);
    

    const toggleClick = () => {
        return setIsCartOpen(!isCartOpen);
    }

    return(
        <div className="cart-icon-container" onClick={toggleClick}>
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">{totalItems}</span>
        </div>
    )
}

export default CartIcon;