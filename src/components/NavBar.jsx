import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css"
import logo from "../assets/TrueTix.png"
import logoutIcon from "../assets/images.jpeg";
import ticketsLogo from "../assets/tickets.jpeg";
import cartLogo from "../assets/Cart.png";

export default function Navbar() {
  const navigate = useNavigate();

  const handleClick = (path, id) => {
    const icon = document.getElementById(id);
    if (icon) {
      icon.classList.add("logo-bounce");
      setTimeout(() => icon.classList.remove("logo-bounce"), 500);
    }
    navigate(path);
  };

  const handleLogout = () => {
    const icon = document.getElementById("logout-icon");
    if (icon) {
      icon.classList.add("logo-bounce");
      setTimeout(() => icon.classList.remove("logo-bounce"), 500);
    }
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src={logo}
          alt="Logo"
          className="navbar-logo"
          onClick={() => handleClick("/events", "main-logo")}
          id="main-logo"
        />
      </div>

      <div className="navbar-right">
        <img
          src={ticketsLogo}
          alt="Tickets"
          className="navbar-icon"
          onClick={() => handleClick("/tickets", "tickets-logo")}
          id="tickets-logo"
        />
        <img
          src={cartLogo}
          alt="Cart"
          className="navbar-icon"
          onClick={() => handleClick("/cart", "cart-logo")}
          id="cart-logo"
        />
        <img
          src={logoutIcon}
          alt="Logout"
          className="navbar-icon"
          onClick={handleLogout}
          id="logout-icon"
        />
      </div>
    </nav>
  );
}