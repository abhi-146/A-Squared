import React, { useState, useEffect } from "react";
import "./Navbar.css";
import asquaredlogo from "../../assets/logo-Asquared.png";
import { IoIosCloseCircle } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";
import { Link } from "react-router-dom";
import Signup from "../login/Login"; // Import your Signup component

const Navbar = () => {
  const [active, setActive] = useState("navBar");
  const [scroll, setScroll] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  const removeNav = () => {
    setActive("navBar");
  };

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const closeSignup = () => {
    setShowSignup(false);
  };

  return (
    <section className={`navBarSection ${scroll ? "scrolled" : ""}`}>
      <header className="header flex">
        <div className="logoDiv">
          <Link to="/" className="logo flex">
            <img src={asquaredlogo} alt="logo" />
          </Link>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <Link to="/" className="navLink">
                Home
              </Link>
            </li>

            <li className="navItem">
              <Link to="/buy" className="navLink">
                Buy
              </Link>
            </li>

            <li className="navItem">
              <Link to="/rent" className="navLink">
                Rent
              </Link>
            </li>

            <li className="navItem">
              <Link to="/commercial" className="navLink">
                Commercial
              </Link>
            </li>

            <li className="navItem">
              <Link to="/offPlan" className="navLink">
                OffPlan
              </Link>
            </li>
            <li className="navItem">
              <Link to="/blogs" className="navLink">
                Blogs
              </Link>
            </li>

            <li className="navItem">
              <Link to="/about" className="navLink">
                About
              </Link>
            </li>

            <li className="navItem">
              <Link to="/contact" className="navLink">
                Contact
              </Link>
            </li>

            <li className="navItem">
              <div className="signupButton" onClick={toggleSignup}>
                Sign Up
              </div>
            </li>
          </ul>

          <div onClick={removeNav} className="closeNavbar">
            <IoIosCloseCircle className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </header>

      {showSignup && (
        <div className="signupPopup">
          <Signup closeSignup={closeSignup}/>
        </div>
      )}
    </section>
  );
};

export default Navbar;
