import { createContext } from "react";
import { products } from "../assets/assets";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const currency = "$";
  const delivery_price = 100;

  const value = {
    products, currency, delivery_price
  }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )

}

export default ShopContextProvider