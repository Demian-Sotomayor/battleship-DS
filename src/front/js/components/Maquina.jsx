import React, { useEffect, useState } from "react";
import "../../styles/tablero.css";
import Swal from "sweetalert2";

const Maquina = ({
  juegoIniciado,
  turnoJugador,
  setTurnoJugador,
  atacarTableroJugador,
  tableroJugador,
  setTableroJugador,
}) => {
  const [tableroMaquina, setTableroMaquina] = useState([]);

  const inicializarTableroMaquina = () => {
    const nuevoTableroMaquina = Array.from({ length: 10 }, () =>
      Array(10).fill({
        contenido: null,
        clickeable: true,
      })
    );

    colocarNavesAleatorias(nuevoTableroMaquina);
    setTableroMaquina(nuevoTableroMaquina);
  };

  useEffect(() => {
    inicializarTableroMaquina();
  }, [juegoIniciado]);

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
        if (columna + i >= 10 || !proximidadNaves(fila, columna + i)) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < longitud; i++) {
        if (fila + i >= 10 || !proximidadNaves(fila + i, columna)) {
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
          contenido: { tipo: "nave", clickeable: false, ataqueExitoso: false },
        };
      } else {
        tableroMaquina[fila + i][columna] = {
          contenido: { tipo: "nave", clickeable: false, ataqueExitoso: false },
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
    if (
      !turnoJugador ||
      !tableroMaquina.length ||
      !tableroMaquina[fila] ||
      !tableroMaquina[fila][columna] ||
      tableroMaquina[fila][columna].contenido?.tipo === "disparo" ||
      tableroMaquina[fila][columna].contenido?.tipo === "nave-disparada"
    ) {
      // El turno no es del jugador, el cuadrado ya ha sido atacado o es una nave ya disparada
      return;
    }
  
    const cuadrado = tableroMaquina[fila][columna];
  
    // Verificar si el cuadrado ya ha sido atacado previamente
    if (cuadrado.contenido && cuadrado.contenido.tipo === "disparo") {
      // El cuadrado ya fue atacado, no se puede atacar nuevamente
      return;
    }
  
    const nuevoTableroMaquina = [...tableroMaquina];
    const contenido = cuadrado.contenido;
  
    if (contenido && contenido.tipo === "nave") {
      nuevoTableroMaquina[fila][columna].contenido.tipo = "nave-disparada";
      nuevoTableroMaquina[fila][columna].contenido.clickeable = false;
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
  
    // Verificar si se destruyeron todas las naves de la máquina
    const navesRestantes = tableroMaquina
      .flat()
      .filter((cuadrado) => cuadrado?.contenido?.tipo === "nave").length;
    if (navesRestantes === 0) {
      // Mostrar mensaje de victoria
      Swal.fire({
        title: "¡Victoria!",
        text: "¡Has destruido todas las naves de la máquina!",
        icon: "success",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Jugar de nuevo",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload(false);
        }
      });
    } else {
      // Cambiar el turno al oponente
      setTurnoJugador(false);
    }
  };
  

  useEffect(() => {
    if (!juegoIniciado || turnoJugador) {
      return;
    }

    const realizarAtaqueMaquina = () => {
      let fila, columna;
    
      // Función para verificar si un cuadrado es válido para disparar
      const esCuadradoValido = (f, c, tablero) => {
        const contenido = tablero[f][c].contenido;
        return !contenido || (contenido.tipo !== "disparo" && contenido.tipo !== "nave-disparada");
      };
    
      // Seleccionar una fila y columna aleatorias que cumplan las condiciones
      do {
        fila = Math.floor(Math.random() * 10);
        columna = Math.floor(Math.random() * 10);
      } while (!esCuadradoValido(fila, columna, tableroJugador));
    
      // Realizar el ataque al tablero del jugador
      atacarTableroJugador(
        fila,
        columna,
        tableroJugador,
        setTableroJugador,
        setTurnoJugador
      );
    
      // Verificar si se destruyeron todas las naves del jugador
      const navesRestantes = tableroJugador
        .flat()
        .filter((cuadrado) => cuadrado?.contenido?.tipo === "nave").length;
      if (navesRestantes === 0) {
        // Mostrar mensaje de derrota
        Swal.fire({
          title: "¡Derrota!",
          text: "¡Todas tus naves han sido destruidas por la máquina!",
          icon: "error",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Jugar de nuevo",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload(false);
          }
        });
      } else {
        // Cambiar el turno al jugador
        setTurnoJugador(true);
      }
    };

    setTimeout(() => {
      realizarAtaqueMaquina();
    }, 1000);
  }, [turnoJugador]);

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
                  }
                    ${
                      cuadrado.contenido?.tipo === "nave"
                        ? "clickeable"
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
