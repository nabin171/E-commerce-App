import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10 p-4 overflow-hidden">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Prime made the ATL proud, putting on a show every time he touched the
          turf. Electrify the game like one of the best corners ever in the Nike
          Diamond Turf 93. It features the iconic midfoot strap and modern
          game-breaking tech, like the Vapor Edge 360
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto">
        {bestSeller.map((item) => (
          <div key={item._id} className="min-w-[200px]">
            <ProductItem
              id={item._id}
              image={item.image}
              price={item.price}
              name={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
