import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_price = 100;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const addToCart = async (itemId, size) => {
    // Optional: Add a check to ensure the user actually selected a size
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItems);

    // Initialize the item object if it doesn't exist yet
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    // CRITICAL: Update the state so React re-renders your UI
    setCartItems(cartData);
  };

  // useEffect(()=>{
  //   console.log(cartItems);
    
  // },[cartItems])

  const getCartCount = () => {
    let totalCount = 0

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item]
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    return totalCount
  }

  const value = {
    products,
    currency,
    delivery_price,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
