import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/latestCollection";
import BestSeller from "../components/BestSeller";
const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
    </div>
  );
};

export default Home;
