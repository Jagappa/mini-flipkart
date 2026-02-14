import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: "#2e7d32",
      padding: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <h2 style={{ color: "white" }}>🌾 AgriKart</h2>

      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/products" style={linkStyle}>Products</Link>
        <Link to="/cart" style={linkStyle}>Cart</Link>
        <Link to="/orders" style={linkStyle}>Orders</Link>

        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/register" style={linkStyle}>Register</Link>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: "white",
  marginLeft: "15px",
  textDecoration: "none"
};

export default Navbar;
