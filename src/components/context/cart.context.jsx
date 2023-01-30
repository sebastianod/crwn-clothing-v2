import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  //for dropdown
  isCartOpen: false,
  setIsCartOpen: () => null,
  //for cart items
  cartItems: [],
  addItemToCart: () => {},
  //for total # of items
  quantitiesArr: [],
  totalItems: 0, //default is zero
});

//----------function to add cart items and keep track of them-----------//
const addCartItem = (cartItems, productToAdd) => {
  //find if cartItems contains product to add already

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  ); //.find returns boolean

  if (existingCartItem) {
    //if true that a cart item exists with said id...
    return cartItems.map(
      (
        cartItem //return new array (non-mutated) for each cartItem...
      ) =>
        cartItem.id === productToAdd.id //...that has the same id as the one just clicked
          ? { ...cartItem, quantity: cartItem.quantity + 1 } //...create a new object with all the previous properties, plus a quantity property +1
          : cartItem //else return the object itself
    );
  } else {
    //if it wasn't already added
    return [...cartItems, { ...productToAdd, quantity: 1 }]; //
  }
};
//---------------------------------------------------------//

// //---------------Get total amount of items-----------------
// const getTotalItems = (cartItems) => {
//   const quantitiesArr = cartItems.map((item) => {
//     return item.quantity;
//   });
//   const totalItems = quantitiesArr.reduce(
//     (previousVal, currentVal) => previousVal + currentVal,
//     0
//   );
//   return totalItems;
// };
// //--------------------------------------------------//

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0); //for total cart items

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  useEffect(() => {//every time cartItems changes, recalculate
      const newCartCount = cartItems.reduce((total, currentVal)=>
      total+currentVal.quantity, 0);
      setTotalItems(newCartCount);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    totalItems,
  }; //what we want to give out

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
