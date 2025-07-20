import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import useStore from "../store/store";
import { ToastContainer } from 'react-toastify';

const Root = () => {
  const initializeUserDoc = useStore((state) => state.initializeUserDoc);
  const currentUser = useStore((state) => state.currentUser);
  const location = useLocation();
  useEffect(() => {
    if (currentUser) {
      initializeUserDoc(currentUser.uid);
    }
  }, [initializeUserDoc, currentUser]);

  if(currentUser && (location.pathname==='/signup'||location.pathname==='/login')){
    return <Navigate to={'/'} replace/>
  }
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
