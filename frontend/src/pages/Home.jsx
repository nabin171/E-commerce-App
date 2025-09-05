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
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relavant");
  const toggleFunction = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let filterCopy = products.slice();
    if (category.length > 0) {
      filterCopy = filterCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    setFilterProducts(filterCopy);
  };

  const sortingFunction = (e) => {
    const sortCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(sortCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(sortCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };
  useEffect(() => {
    sortingFunction();
  }, [sortType]);
  useEffect(() => {
    setFilterProducts(products);
  }, []);
  useEffect(() => {
    applyFilter();
  }, [category]);

  return (
    <div>
      <div onClick={() => setShowFilter(!showFilter)}>
        Filters
        <div
          className={`border w-20 h-20 ${showFilter ? "" : "hidden"} sm:block`}
        >
          Categories
          <p className="flex gap-2">
            <input type="checkbox" onChange={toggleFunction} value="Men" />
            MEn
          </p>
          <p className="flex gap-2">
            <input type="checkbox" onChange={toggleFunction} value="Women" />
            WOmen
          </p>
        </div>
        <div>
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by:Relavant</option>
            <option value="low-high">Sort by:Low to High</option>
            <option value="high-low">Sort by:High to Low</option>
          </select>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
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
