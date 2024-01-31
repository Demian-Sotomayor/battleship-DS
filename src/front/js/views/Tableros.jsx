import React, { useState } from "react";
import { Link } from "react-router-dom";
import Jugador from "../components/Jugador";
import Maquina from "../components/Maquina";
import Swal from "sweetalert2";

const Tableros = () => {
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [navesColocadas, setNavesColocadas] = useState(false);
  const [mostrarBotonNavesAleatorias, setMostrarBotonNavesAleatorias] =
    useState(true);
  const [numeroTurno, setNumeroTurno] = useState(1);
  const [turnoJugador, setTurnoJugador] = useState(true);

  const handleIniciarJuego = () => {
    if (navesColocadas) {
      setJuegoIniciado(true);
      setMostrarBotonNavesAleatorias(false);
      setTurnoJugador(true);
    } else {
      Swal.fire("Coloca tus naves para jugar!");
    }
  };

  return (
    <div className="p-5">
      <div className="row">
        <Link to="/" className="btn-regresar-al-menu col-4 text-white">
          Regresar al menú
        </Link>
        <h2 className="col-4">Battleship</h2>
        <div className="col-4"></div>
      </div>

      <div className="contenedor-tableros">
        <Jugador
          juegoIniciado={juegoIniciado}
          setNavesColocadas={setNavesColocadas}
          setNumeroTurno={setNumeroTurno}
          setMostrarBotonNavesAleatorias={setMostrarBotonNavesAleatorias}
          turnoJugador={turnoJugador}
          setTurnoJugador={setTurnoJugador}
        />
        <Maquina
          juegoIniciado={juegoIniciado}
          setNumeroTurno={setNumeroTurno}
          turnoJugador={turnoJugador}
          setTurnoJugador={setTurnoJugador}
        />
      </div>

      <div
        className={juegoIniciado ? `turno-mensaje text-center` : "text-center"}
      >
        {juegoIniciado && (
          <h3>{turnoJugador ? "Es tu turno" : "Turno del oponente"}</h3>
        )}
      </div>

      <div className="d-flex justify-content-center align-items-center">
      {!juegoIniciado && (
          <button
            className="btn btn-success btn-jugar"
            onClick={handleIniciarJuego}
          >
            Jugar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tableros;
