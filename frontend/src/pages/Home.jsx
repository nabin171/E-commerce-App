import React, {
  use,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/latestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import { RxHamburgerMenu } from "react-icons/rx";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/Productitem";
import Title from "../components/Title";
const Home = () => {
  const { products } = useContext(ShopContext);

  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
