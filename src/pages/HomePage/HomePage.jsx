import React, { useEffect, useState } from "react";
import Header from "../../components/HomePage/Header";
import InfoApp from "../../components/HomePage/InfoApp";
import Footer from "../../components/HomePage/Footer";
import CategoryGrid from "../../components/HomePage/Category/CategoryGrid";
import HeroSection from "../../components/HomePage/HeroSection";
import ProductGrid from "../../components/HomePage/TodayPick/ProductGrid";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <>
      <Header user={user} />
      <HeroSection />
      <CategoryGrid />
      <ProductGrid headerTitle={"Today's Picks"} user={user} />
      <InfoApp />
      <Footer />
    </>
  );
};

export default HomePage;
