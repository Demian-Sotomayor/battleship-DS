import React, { useEffect, useState } from "react";
import "../../styles/tablero.css";

const Maquina = ({ juegoIniciado, setNumeroTurno, turnoJugador, setTurnoJugador }) => {
  const [tablero, setTablero] = useState([]);

  useEffect(() => {
    inicializarTablero();
  }, [juegoIniciado]);

  const inicializarTablero = () => {
    const nuevoTablero = Array.from({ length: 10 }, () =>
      Array(10).fill({ contenido: null, clickeable: true })
    );
    setTablero(nuevoTablero);
  };

  const encontrarCuadroClickeableAleatorio = () => {
    const cuadradosClickeables = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (tablero[i][j].clickeable) {
          cuadradosClickeables.push({ fila: i, columna: j });
        }
      }
    }

    // Seleccionar aleatoriamente un cuadro clickeable
    const cuadroAleatorio =
      cuadradosClickeables[
        Math.floor(Math.random() * cuadradosClickeables.length)
      ];
    return cuadroAleatorio;
  };

  useEffect(() => {
    if (juegoIniciado && !turnoJugador) {
      const timeoutId = setTimeout(() => {
        const cuadroAleatorio = encontrarCuadroClickeableAleatorio();
        if (cuadroAleatorio) {
          const nuevoTablero = [...tablero];
          nuevoTablero[cuadroAleatorio.fila][cuadroAleatorio.columna] = {
            contenido: "disparo", // O el contenido que desees
            clickeable: false
          };
          setTablero(nuevoTablero);
          setTurnoJugador(true);
          setNumeroTurno((prevTurno) => prevTurno + 1);
        }
      }, 1000); // Retraso de 1 segundo (ajustable)

      return () => clearTimeout(timeoutId);
    }
  }, [juegoIniciado, setNumeroTurno, tablero, turnoJugador, setTurnoJugador]);

  return (
    <div className="my-5">
      <div className="contenedor-tablero d-flex justify-content-center">
        <table className="tablero">
          <thead>
            {/* ... (código previo) */}
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
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Maquina;
