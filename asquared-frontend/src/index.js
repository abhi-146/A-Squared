import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Rent from "./pages/rent/Rent.jsx";
import Buy from "./pages/buy/Buy.jsx";
import PropertyPage from "./pages/PropertyPage/PropertyPage.jsx";
import AdminPanel from "./pages/admin/adminPanel/AdminPanel.jsx";
import OffPlan from "./pages/offplan/OffPlan.jsx";
import Commercial from "./pages/commercial/Commercial.jsx";
import About from "./pages/about/About.jsx";
import Contact from "./pages/contact/Contact.jsx";
import EditRentalListing from "./pages/admin/addRentalListing/EditRentalListings.jsx";
import PrivacyPolicy from "./pages/privacyPolicy/PrivacyPolicy.jsx";
import Disclaimer from "./pages/disclaimer/Disclaimer.jsx";
import TermsAndConditions from "./pages/tnc/Tnc.jsx";
import EditBuyListing from "./pages/admin/addBuyListing/EditBuyListings.jsx";
import EditCommercialListing from "./pages/admin/addCommercialListing/EditCommercialListings.jsx";
import OffPlanPropertyPage from "./pages/offPlanPropertyPage/OffPlanPropertyPage.jsx";
import BlogPage from "./pages/blogPage/BlogPage.jsx";
import EditBlog from "./pages/admin/addBlog/EditBlog.jsx";
import SingleBlog from "./pages/singleBlog/SingleBlog.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/property",
        element: <PropertyPage />,
      },
      {
        path: "/admin",
        element: <AdminPanel />,
      },
      {
        path: "/edit-rental-listing",
        element: <EditRentalListing />,
      },
      {
        path: "/edit-buy-listing",
        element: <EditBuyListing />,
      },
      {
        path: "/edit-commercial-listing",
        element: <EditCommercialListing />,
      },
      {
        path: "/edit-blog",
        element: <EditBlog />,
      },
      {
        path: "/single-blog",
        element: <SingleBlog />,
      },
      {
        path: "/rent",
        element: <Rent />,
      },
      {
        path: "/buy",
        element: <Buy />,
      },
      {
        path: "/commercial",
        element: <Commercial />,
      },
      {
        path: "/offPlan",
        element: <OffPlan />,
      }, 
      {
        path: "/blogs",
        element: <BlogPage />,
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/property-details",
        element: <PropertyPage />,
      },
      {
        path: "/offplan-property-details",
        element: <OffPlanPropertyPage />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/disclaimer",
        element: <Disclaimer />,
      },
      {
        path: "/tnc",
        element: <TermsAndConditions />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
