import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";
export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_Fee = 400;
  const value = {
    products,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
