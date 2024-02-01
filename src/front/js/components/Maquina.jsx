import React, { useEffect, useState } from "react";
import "../../styles/tablero.css";

const Maquina = ({
  juegoIniciado,
  turnoJugador,
  setTurnoJugador,
}) => {
  const [tableroMaquina, setTableroMaquina] = useState([]);

  useEffect(() => {
    inicializarTableroMaquina();
  }, [juegoIniciado]);

  const inicializarTableroMaquina = () => {
    const nuevoTableroMaquina = Array.from({ length: 10 }, () =>
      Array(10).fill({
        contenido: null,
        clickeable: true,
        ataqueExitoso: false,
      })
    );
  
    colocarNavesAleatorias(nuevoTableroMaquina);
    setTableroMaquina(nuevoTableroMaquina);
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
          !proximidadNaves(fila, columna + i)
        ) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < longitud; i++) {
        if (
          fila + i >= 10 ||
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
    tableroMaquina
  ) => {
    for (let i = 0; i < longitud; i++) {
      if (orientacion === "horizontal") {
        tableroMaquina[fila][columna + i] = {
          contenido: { tipo: "nave", clickeable: false },
        };
      } else {
        tableroMaquina[fila + i][columna] = {
          contenido: { tipo: "nave", clickeable: false },
        };
      }
    }
  };

  const colocarNavesAleatorias = (tableroMaquina) => {
    const navesPorLongitud = {
      4: 1, // 1 nave de longitud 4
      3: 2, // 2 naves de longitud 3
      2: 4, // 4 naves de longitud 2
      1: 3, // 3 naves de longitud 1
    };
  
    Object.keys(navesPorLongitud).forEach((longitud) => {
      for (let i = 0; i < navesPorLongitud[longitud]; i++) {
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
            parseInt(longitud),
            orientacionActual,
            tableroMaquina
          )
        );
  
        colocarNaveEnTablero(
          fila,
          columna,
          parseInt(longitud),
          orientacionActual,
          tableroMaquina
        );
      }
    });
  };

  const realizarAtaque = (fila, columna) => {
    if (turnoJugador && tableroMaquina[fila][columna].clickeable) {
      const nuevoTableroMaquina = [...tableroMaquina];
      const contenido = nuevoTableroMaquina[fila][columna].contenido;
  
      if (contenido && contenido.tipo === "nave") {
        nuevoTableroMaquina[fila][columna] = {
          contenido: {
            tipo: "nave-disparada",
            clickeable: false,
          },
        };
      } else if (!contenido) {
        nuevoTableroMaquina[fila][columna] = {
          contenido: {
            tipo: "disparo",
            clickeable: false,
            ataqueExitoso: false,
          },
        };
      }
  
      setTableroMaquina(nuevoTableroMaquina);
      setTurnoJugador(false);
    }
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
            {tableroMaquina.map((fila, rowIndex) => (
              <tr key={rowIndex}>
                <td className="etiqueta">{rowIndex + 1}</td>
                {fila.map((cuadrado, colIndex) => {
                  const clases = `cuadrado ${
                    cuadrado.clickeable ? "clickeable" : ""
                  } ${
                    cuadrado.contenido &&
                    cuadrado.contenido.tipo === "nave"
                      ? "nave"
                      : cuadrado.contenido?.tipo === "nave-disparada"
                      ? "nave-disparada"
                      : cuadrado.contenido?.tipo === "disparo"
                      ? cuadrado.contenido?.ataqueExitoso
                        ? "nave-disparada"
                        : "disparo"
                      : ""
                  }`;
  
                  return (
                    <td
                      key={colIndex}
                      className={clases}
                      onClick={() => realizarAtaque(rowIndex, colIndex)}
                    ></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  };

export default Maquina;
