import React, { useEffect, useState } from "react";
import "../../styles/tablero.css";

export const atacarTableroJugador = (
  fila,
  colIndex,
  tableroJugador,
  setTableroJugador,
  setTurnoJugador
) => {
  console.log("Intentando atacar a tablero de jugador, fila: ", fila, "columna: ", colIndex);
  if (
    fila >= 0 &&
    fila < 10 &&
    colIndex >= 0 &&
    colIndex < 10 &&
    tableroJugador
  ) {
    console.log(tableroJugador, "probandooooooooooooo")
    // Clonar el tablero original profundamente
    const nuevoTableroJugador = JSON.parse(JSON.stringify(tableroJugador));

    // Lógica para el ataque de la máquina al jugador
    
    console.log("[LÍNEA DEL ERROR] fila:", fila, "columna:", colIndex);
    console.log("VIENDO TABLERO JUGADOR", nuevoTableroJugador)
    console.log("PROBANDO ERROR", nuevoTableroJugador[fila][colIndex]);
    if (nuevoTableroJugador[fila][colIndex].contenido?.tipo === "nave") {
      console.log("Este console.log no se ejecuta");
      nuevoTableroJugador[fila][colIndex] = {
        contenido: {
          tipo: "nave-disparada",
          clickeable: false,
          ataqueExitoso: true,
        },
      };
      console.log(
        "Tablero de jugador si el disparo acierta (luego de que la máquina intente atacar, en if)",
        nuevoTableroJugador
      );
    } else if (!nuevoTableroJugador[fila][colIndex].contenido) {
      nuevoTableroJugador[fila][colIndex] = {
        contenido: {
          tipo: "disparo",
          ataqueExitoso: false,
          clickeable: false,
        },
      };
      console.log(
        "Tablero de jugador si el disparo falla (luego de que la máquina intente atacar, en else if)",
        nuevoTableroJugador
      );
    }

    setTableroJugador(nuevoTableroJugador);
    setTurnoJugador(true); // Después del ataque de la máquina, vuelve al turno del jugador
  }
};



const Jugador = ({
  juegoIniciado,
  setNavesColocadas,
  setMostrarBotonNavesAleatorias,
  turnoJugador,
  tableroJugador,
  setTableroJugador
}) => {
  const [colocandoNaves, setColocandoNaves] = useState(false);

  const inicializarTablero = () => {
    const nuevoTableroJugador = Array.from({ length: 10 }, () =>
      Array(10).fill({ contenido: null, clickeable: true })
    );
    setTableroJugador(nuevoTableroJugador);
  };

  useEffect(() => {
    inicializarTablero();
  }, [colocandoNaves]);

  const handleClickCuadro = (fila, columna) => {
    if (juegoIniciado && turnoJugador) {
      const cuadroSeleccionado = tableroJugador[fila][columna];

      if (turnoJugador) {
        // Asegurarse de que el jugador no ataque su propio tablero
        if (
          esPropioTablero(fila, columna) ||
          !cuadroSeleccionado.clickeable ||
          cuadroSeleccionado.contenido !== null
        ) {
          return;
        }
      }
    }
  };

  const esPropioTablero = (fila, columna) => {
    return fila >= 0 && fila < 10 && columna >= 0 && columna < 10;
  };

  const esPosicionValida = (
    fila,
    columna,
    longitud,
    orientacion,
    tableroJugador
  ) => {
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
            tableroJugador[nuevaFila][nuevaColumna].contenido &&
            tableroJugador[nuevaFila][nuevaColumna].contenido.tipo === "nave"
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
          tableroJugador[fila][columna + i].contenido !== null ||
          !proximidadNaves(fila, columna + i)
        ) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < longitud; i++) {
        if (
          fila + i >= 10 ||
          tableroJugador[fila + i][columna].contenido !== null ||
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
    tableroJugador
  ) => {
    if (orientacion === "horizontal") {
      for (let i = 0; i < longitud; i++) {
        tableroJugador[fila][columna + i] = {
          contenido: { tipo: "nave", ataqueExitoso: false, clickeable: true },
        };
      }
    } else {
      for (let i = 0; i < longitud; i++) {
        tableroJugador[fila + i][columna] = {
          contenido: { tipo: "nave", ataqueExitoso: false, clickeable: true },
        };
      }
    }
  };

  const handleColocarNaves = () => {
    const nuevoTableroJugador = Array.from({ length: 10 }, () =>
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
            nuevoTableroJugador
          )
        );

        colocarNaveEnTablero(
          fila,
          columna,
          longitud,
          orientacionActual,
          nuevoTableroJugador
        );
      }
    });

    setTableroJugador(nuevoTableroJugador);
    setColocandoNaves(false);
    setNavesColocadas(true);
    setMostrarBotonNavesAleatorias(false);
    console.log("TABLERO CON NAVES PUESTAS DEL JUGADOR", nuevoTableroJugador);
  };

  return (
    <div className="my-5">
      <div className="contenedor-tableroJugador d-flex justify-content-center">
        <table className="tableroJugador">
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
                {fila.map((cuadrado, colIndex) => {
                  const clases = `cuadrado ${
                    cuadrado.clickeable ? "clickeable" : ""
                  } ${
                    cuadrado.contenido
                      ? cuadrado.contenido.tipo === "nave"
                        ? "nave"
                        : cuadrado.contenido.tipo === "disparo"
                        ? cuadrado.contenido.ataqueExitoso
                          ? "nave-disparada"
                          : "disparo"
                        : ""
                      : ""
                  }`;

                  return (
                    <td
                      key={colIndex}
                      className={clases}
                      onClick={() => handleClickCuadro(rowIndex, colIndex)}
                    ></td>
                  );
                })}
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
