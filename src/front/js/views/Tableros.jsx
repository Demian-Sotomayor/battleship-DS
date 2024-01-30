import React from "react";
import { Link } from "react-router-dom";
import Juego from "../components/Juego";

const Tableros = () => {
  return (
    <div className="p-5">
      <h2>Battleship</h2>

      <div className="contenedor-tablero">
        <Juego />
      </div>

      <Link to="/" className="btn btn-info btn-regresar-al-menu">
        Regresar al menú
      </Link>
    </div>
  );
};

export default Tableros;
