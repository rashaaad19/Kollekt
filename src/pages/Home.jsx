import React from "react";
import HomeLayout from "../components/home/HomeLayout";
import Sidebar from "../components/home/Sidebar";

const Home = () => {
  return (
    <Sidebar>
      <HomeLayout/>
    </Sidebar>
  );
};

export default Home;
