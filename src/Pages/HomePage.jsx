import React from "react";
import PosterCard from "../components/PosterCard";
import CategorySection from "../components/CategorySection";
import PopularProduct from "../components/PopularProduct";
import ServicesSection from "../components/ServicesSection";
// import SubCategorySection from '../components/SubCategorySection'

const HomePage = () => {
  return (
    <div>
      <div className="overlay" data-overlay></div>
      <main>
        <PosterCard />
        <CategorySection />
        <PopularProduct />
        <ServicesSection />
      </main>
    </div>
  );
};

export default HomePage;
