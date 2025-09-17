import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { motion } from "motion/react";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  // Duplicate the items to create seamless scroll
  const scrollingItems = [...bestSeller, ...bestSeller];

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

      <motion.div
        className="flex gap-4"
        animate={{ x: ["0%", "-50%"] }} // move by half the container (since we duplicated)
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {scrollingItems.map((item, index) => (
          <div key={index} className="min-w-[200px]">
            <ProductItem
              id={item._id}
              image={item.image}
              price={item.price}
              name={item.name}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default BestSeller;
