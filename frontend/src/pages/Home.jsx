import React, { use, useContext, useEffect, useState } from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/latestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import { RxHamburgerMenu } from "react-icons/rx";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/Productitem";
const Home = () => {
  const { products } = useContext(ShopContext);
  const [hide, setHide] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  useEffect(() => {
    setFilterProducts(products);
  });
  return (
    <div>
      <div>
        <p onClick={() => setHide(!hide)}>Filter</p>
        <div className={`border w-25 h-20 ${hide ? "" : "hidden"} sm:block  `}>
          CATEGORY
          <p className="flex gap">
            <input type="checkbox" value="MALE" />
            MALE
          </p>
          <p className="flex gap">
            <input type="checkbox" value="FEMALE" />
            FEMALE
          </p>
        </div>
      </div>
      <div>
        {filterProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
