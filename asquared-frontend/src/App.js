import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import OffPlanPropertyPage from "./pages/offPlanPropertyPage/OffPlanPropertyPage.jsx";

const App = () => {
  const location = useLocation();
  const onAdminPage = location.pathname.startsWith("/admin") || 
                    location.pathname.startsWith("/edit-rental-listing") || 
                    location.pathname.startsWith("/edit-commercial-listing") ||
                    location.pathname.startsWith("/edit-offplan-listing") || 
                    location.pathname.startsWith("/edit-buy-listing") || 
                    location.pathname.startsWith("/edit-blog")


  return (
    <>
    {/* <OffPlanPropertyPage/> */}
      {!onAdminPage && <Navbar />} 
      <Outlet />
      {!onAdminPage && <Footer />} 
    </>
  );
};

export default App;
