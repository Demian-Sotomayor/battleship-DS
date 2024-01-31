import React, { useEffect, useState } from "react";
import "../../styles/tablero.css";

const Jugador = ({
    juegoIniciado,
    setNavesColocadas,
    setNumeroTurno,
    setMostrarBotonNavesAleatorias,
    turnoJugador,
    setTurnoJugador
  }) => {
    const [tablero, setTablero] = useState([]);
    const [colocandoNaves, setColocandoNaves] = useState(false);
  
    useEffect(() => {
      inicializarTablero();
    }, [colocandoNaves]);
  

    const inicializarTablero = () => {
        const nuevoTablero = Array.from({ length: 10 }, () =>
          Array(10).fill({ contenido: null, clickeable: true })
        );
        setTablero(nuevoTablero);
      };

  const handleClickCuadro = (fila, columna) => {
    if (juegoIniciado && (turnoJugador || false)) {
      const cuadroSeleccionado = tablero[fila][columna];

      if (cuadroSeleccionado.clickeable) {
        const nuevoTablero = [...tablero];

        if (!colocandoNaves) {
          // Lógica para el tablero del jugador durante el juego
          if (cuadroSeleccionado.contenido === "nave") {
            // Lógica adicional si el jugador impacta una nave
          }

          nuevoTablero[fila][columna] = {
            ...cuadroSeleccionado,
            clickeable: false,
            disparado: true,
          };
          setTablero(nuevoTablero);
          setTurnoJugador(false);
          setNumeroTurno((prevTurno) => prevTurno + 1);

          setTimeout(() => {
            // Lógica para el ataque de la máquina
            setNumeroTurno((prevTurno) => prevTurno + 1);
          }, 1000);
        } else {
          // Lógica para el tablero del jugador durante la colocación de naves
          // ... (mismo código que tenías en Juego.jsx)
        }
      }
    }
  };

  const esPosicionValida = (fila, columna, longitud, orientacion, tablero) => {
    const proximidadNaves = (f, c) => {
      // Código para verificar que no hayan naves pegadas una a otra
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const nuevaFila = f + i;
          const nuevaColumna = c + j;

          if (
            nuevaFila >= 0 &&
            nuevaFila < 10 &&
            nuevaColumna >= 0 &&
            nuevaColumna < 10 &&
            tablero[nuevaFila][nuevaColumna].contenido === "nave"
          ) {
            return false;
          }
        }
      }
      return true;
    };

    if (orientacion === "horizontal") {
      for (let i = 0; i < longitud; i++) {
        if (
          columna + i >= 10 ||
          tablero[fila][columna + i].contenido !== null ||
          !proximidadNaves(fila, columna + i)
        ) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < longitud; i++) {
        if (
          fila + i >= 10 ||
          tablero[fila + i][columna].contenido !== null ||
          !proximidadNaves(fila + i, columna)
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const colocarNaveEnTablero = (
    fila,
    columna,
    longitud,
    orientacion,
    tablero
  ) => {
    if (orientacion === "horizontal") {
      for (let i = 0; i < longitud; i++) {
        tablero[fila][columna + i] = {
          contenido: "nave",
          clickeable: false,
        };
      }
    } else {
      for (let i = 0; i < longitud; i++) {
        tablero[fila + i][columna] = {
          contenido: "nave",
          clickeable: false,
        };
      }
    }
  };

  const handleColocarNaves = () => {
    const nuevoTablero = Array.from({ length: 10 }, () =>
      Array(10).fill({ contenido: null, clickeable: true })
    );

    const navesRestantes = {
      4: 1, // 1 nave de longitud 4
      3: 2, // 2 naves de longitud 3
      2: 4, // 4 naves de longitud 2
      1: 3, // 3 naves de longitud 1
    };

    Object.keys(navesRestantes).forEach((longitud) => {
      for (let i = 0; i < navesRestantes[longitud]; i++) {
        let fila, columna, orientacionActual;

        do {
          // Generar posición aleatoria
          fila = Math.floor(Math.random() * 10);
          columna = Math.floor(Math.random() * 10);

          // Cambiar entre orientación horizontal y vertical
          orientacionActual =
            orientacionActual === "horizontal" ? "vertical" : "horizontal";
        } while (
          !esPosicionValida(
            fila,
            columna,
            longitud,
            orientacionActual,
            nuevoTablero
          )
        );

        colocarNaveEnTablero(
          fila,
          columna,
          longitud,
          orientacionActual,
          nuevoTablero
        );
      }
    });

    setTablero(nuevoTablero);
    setColocandoNaves(false);
    setNavesColocadas(true);
    setMostrarBotonNavesAleatorias(false);
  };

  return (
    <div className="my-5">
      <div className="contenedor-tablero d-flex justify-content-center">
        <table className="tablero">
          <thead>
            <tr>
              <th className="etiqueta"></th>
              {Array.from({ length: 10 }, (_, index) => (
                <th key={index} className="etiqueta">
                  {String.fromCharCode(65 + index)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {tablero.map((fila, rowIndex) => (
              <tr key={rowIndex}>
                <td className="etiqueta">{rowIndex + 1}</td>
                {fila.map((cuadrado, colIndex) => (
                  <td
                    key={colIndex}
                    className={`cuadrado ${
                      cuadrado.clickeable ? "clickeable" : ""
                    } ${cuadrado.contenido}`}
                    onClick={() => handleClickCuadro(rowIndex, colIndex)}
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!juegoIniciado && (
        <button
          className="btn btn-info mt-5 fw-bold btn-naves-aleatorias"
          onClick={handleColocarNaves}
        >
          Colocar Naves Aleatorias
        </button>
      )}
    </div>
  );
};

export default Jugador;
