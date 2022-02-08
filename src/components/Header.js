import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header-main">
      <div className="logo">Superteam</div>
      <div className="profile">
        <img
          className="user-img"
          src={require("./../images/userlogo.jpg")}
          alt="profile-img"
        />
      </div>
    </div>
  );
}

export default Header;
