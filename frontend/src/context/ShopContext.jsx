import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import axios from "axios"

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_price = 100;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("token") || "")

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/login")
  }

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

  const updateQuantity = async (itemId, size, quantity) => {

    let cartData = structuredClone(cartItems)

    cartData[itemId][size] = quantity

    setCartItems(cartData)

  }

  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItems) {
      let itemInfo = products.find((product)=> product._id === items)
      for (const item in cartItems[items]){
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item]
          }
        } catch (error) {
          
        }
      }
    }
    return totalAmount
  }

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list")
      if (response.data.success) {
        setProducts(response.data.products)
      } else {
        toast.error(response.data.message)
      }
        
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getProductsData()
  },[])


  const value = {
    products,
    currency,
    backendUrl,
    delivery_price,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    token,
    setToken,
    logout
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
