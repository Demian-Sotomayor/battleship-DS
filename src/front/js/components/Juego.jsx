import React, { useState } from "react";

import "../../styles/tablero.css";

const Juego = () => {
  const [tableroJugador, setTableroJugador] = useState([]);
  const [navesRestantes, setNavesRestantes] = useState(10);
  const [colocandoNaves, setColocandoNaves] = useState(false);

  const inicializarTablero = () => {
    const nuevoTablero = Array.from({ length: 10 }, () =>
      Array(10).fill({ contenido: null, clickeable: true })
    );
    setTableroJugador(nuevoTablero);
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

    setTableroJugador(nuevoTablero);
    setNavesRestantes(10);
    setColocandoNaves(false);
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

  const handleArrastrarNave = (e, rowIndex, colIndex) => {
    e.preventDefault();
    // Código para empezar el arrastre de la nave
  };

  const handleSoltarNave = (e, rowIndex, colIndex) => {
    e.preventDefault();
    // Código para soltar la nave en la nueva posición
  };

  const handleMoverNave = (e, rowIndex, colIndex) => {
    e.preventDefault();
    // Código para mostrar el arrastre de la nave por el tablero
  };

  return (
    <>
      <h1>Juego</h1>

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
          {tableroJugador.map((fila, rowIndex) => (
            <tr key={rowIndex}>
              <td className="etiqueta">{rowIndex + 1}</td>
              {fila.map((cuadrado, colIndex) => (
                <td
                  key={colIndex}
                  className={`cuadrado ${
                    cuadrado.clickeable ? "clickeable" : ""
                  } ${cuadrado.contenido}`}
                  onClick={() => handleClickCuadro(rowIndex, colIndex)}
                  onMouseDown={(event) =>
                    handleArrastrarNave(event, rowIndex, colIndex)
                  }
                  onMouseUp={(event) =>
                    handleSoltarNave(event, rowIndex, colIndex)
                  }
                  onMouseMove={(event) =>
                    handleMoverNave(event, rowIndex, colIndex)
                  }
                >
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleColocarNaves}>
        {colocandoNaves ? "Cancelar Colocación" : "Colocar Naves Aleatorias"}
      </button>

      <div className="tablero">
        {/* Lo iba a usar, no lo usé y ahora por alguna razón si lo quito se ven feos los botones XD, lo arreglo luego, es sólo visual */}
      </div>
    </>
  );
};

export default Juego;
