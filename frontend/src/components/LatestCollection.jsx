import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const { products } = useContext(ShopContext);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);
  return (
    <div className="my-10 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Prime made the ATL proud, putting on a show every time he touched the
          turf. Electrify the game like one of the best corners ever in the Nike
          Diamond Turf 93. It features the iconic midfoot strap and modern
          game-breaking tech, like the Vapor Edge 360
        </p>
      </div>

      {/* rendering products*/}
      <div className="grid px-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            price={item.price}
            name={item.name}
          ></ProductItem>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
