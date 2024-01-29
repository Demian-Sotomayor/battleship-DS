import React from "react";
import { Link } from "react-router-dom";

import "../../styles/menu.css";

const Menu = () => {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center flex-column">

        <h1 className="titulo-juego">Battleship</h1>

        <Link to="/tableros" className="btn-iniciar-juego d-flex justify-content-center align-items-center text-decoration-none">
          <i className="fa-solid fa-play"></i>
        </Link>

      </div>
    </>
  );
};

export default Menu;
