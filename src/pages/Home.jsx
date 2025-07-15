import React from "react";
import HomeLayout from "../components/home/HomeLayout";
import Sidebar from "../components/home/Sidebar";
import Input from "../components/layout/Input";

const Home = () => {
  return (
    <Sidebar>
      <HomeLayout/>
    </Sidebar>
  );
};

export default Home;
