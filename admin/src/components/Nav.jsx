import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <nav>
      <Link to="">
        <button className="add">Admin</button>
      </Link>
      <Link to="createItem">
        <button className="add">Create New Item </button>
      </Link>
      <Link to="menu">
        <button className="add">Menu</button>
      </Link>
    </nav>
  );
};

export default Nav;
