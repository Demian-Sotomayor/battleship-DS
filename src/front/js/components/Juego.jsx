// import React, { useEffect, useState } from "react";
// import "../../styles/tablero.css";

// const Juego = ({
//   esComputadora,
//   juegoIniciado,
//   setNavesColocadas,
//   mostrarBotonNavesAleatorias,
//   setNumeroTurno,
// }) => {
//   const [tablero, setTablero] = useState([]);
//   const [colocandoNaves, setColocandoNaves] = useState(false);
//   const [turnoJugador, setTurnoJugador] = useState(true);

//   const inicializarTablero = () => {
//     const nuevoTablero = Array.from({ length: 10 }, () =>
//       Array(10).fill({ contenido: null, clickeable: true })
//     );
//     setTablero(nuevoTablero);
//   };

//   useEffect(() => {
//     inicializarTablero();
//   }, [esComputadora]);

//   const handleClickCuadro = (fila, columna) => {
//     if (juegoIniciado && (turnoJugador || esComputadora)) {
//       const cuadroSeleccionado = tablero[fila][columna];

//       if (cuadroSeleccionado.clickeable) {
//         const nuevoTablero = [...tablero];

//         if (esComputadora) {
//           const resultadoAtaque = ataqueComputadora(
//             fila,
//             columna,
//             nuevoTablero
//           );

//           setTablero(resultadoAtaque.tablero);
//           setTurnoJugador(true);
//           setNumeroTurno((prevTurno) => prevTurno + 1);
//         } else {

//           if (cuadroSeleccionado.contenido === "nave") {
  
//           }

//           // Actualizar el tablero y los turnos
//           nuevoTablero[fila][columna] = {
//             ...cuadroSeleccionado,
//             clickeable: false,
//             disparado: true,
//           };
//           setTablero(nuevoTablero);
//           setTurnoJugador(false);
//           setNumeroTurno((prevTurno) => prevTurno + 1);

//           // Disparo de la computadora después de que el jugador haya hecho click
//           if (!esComputadora) {
//             setTimeout(() => {
//               disparoComputadora();
//             }, 1000);
//           }
//         }
//       }
//     }
//   };

//   const ataqueComputadora = (fila, columna, tablero) => {
//     const nuevoTablero = [...tablero];
//     const cuadroSeleccionado = nuevoTablero[fila][columna];

//     // Verificar si ya se disparó en este cuadro
//     if (!cuadroSeleccionado.disparado) {
//       if (cuadroSeleccionado.contenido === "nave") {
//         // Si hay una nave, se marca como impactada
//         nuevoTablero[fila][columna] = {
//           ...cuadroSeleccionado,
//           clickeable: false,
//           disparado: true,
//           impactada: true,
//         };
//       } else {
//         // Si no hay una nave, se marca como disparado sin impacto
//         nuevoTablero[fila][columna] = {
//           ...cuadroSeleccionado,
//           clickeable: false,
//           disparado: true,
//           impactada: false,
//         };
//       }
//     }

//     return { tablero: nuevoTablero };
//   };

//   const disparoComputadora = () => {
//     if (juegoIniciado && esComputadora && !turnoJugador) {
//       const cuadroClickeable = encontrarCuadroClickeableAleatorio();

//       setTimeout(() => {
//         const nuevoTablero = [...tablero];
//         const { fila, columna } = cuadroClickeable;

//         if (nuevoTablero[fila][columna].clickeable) {
//           nuevoTablero[fila][columna] = {
//             ...nuevoTablero[fila][columna],
//             clickeable: false,
//             disparado: true,
//             color: "rgb(14, 39, 71)", 
//           };

//           setTablero(nuevoTablero);
//           setTurnoJugador(true);
//           setNumeroTurno((prevTurno) => prevTurno + 1);
//         }
//       }, 1000); 
//     }
//   };

//   useEffect(() => {
//     if (juegoIniciado && esComputadora && !turnoJugador) {
//       const timeoutId = setTimeout(() => {
//         disparoComputadora();
//         setTurnoJugador(true);
//         setNumeroTurno((prevTurno) => prevTurno + 1);
//       }, 1000); // Retraso de 1 segundo

//       return () => clearTimeout(timeoutId);
//     }
//   }, [
//     juegoIniciado,
//     esComputadora,
//     turnoJugador,
//     disparoComputadora,
//     setNumeroTurno,
//   ]);

//   const encontrarCuadroClickeableAleatorio = () => {
//     const cuadradosClickeables = [];
//     for (let i = 0; i < 10; i++) {
//       for (let j = 0; j < 10; j++) {
//         if (tablero[i][j].clickeable) {
//           cuadradosClickeables.push({ fila: i, columna: j });
//         }
//       }
//     }

//     // Seleccionar aleatoriamente un cuadro clickeable
//     const cuadroAleatorio =
//       cuadradosClickeables[
//         Math.floor(Math.random() * cuadradosClickeables.length)
//       ];
//     return cuadroAleatorio;
//   };

//   const handleColocarNaves = () => {
//     const nuevoTablero = Array.from({ length: 10 }, () =>
//       Array(10).fill({ contenido: null, clickeable: true })
//     );

//     const navesRestantes = {
//       4: 1, // 1 nave de longitud 4
//       3: 2, // 2 naves de longitud 3
//       2: 4, // 4 naves de longitud 2
//       1: 3, // 3 naves de longitud 1
//     };

//     Object.keys(navesRestantes).forEach((longitud) => {
//       for (let i = 0; i < navesRestantes[longitud]; i++) {
//         let fila, columna, orientacionActual;

//         do {
//           // Generar posición aleatoria
//           fila = Math.floor(Math.random() * 10);
//           columna = Math.floor(Math.random() * 10);

//           // Cambiar entre orientación horizontal y vertical
//           orientacionActual =
//             orientacionActual === "horizontal" ? "vertical" : "horizontal";
//         } while (
//           !esPosicionValida(
//             fila,
//             columna,
//             longitud,
//             orientacionActual,
//             nuevoTablero
//           )
//         );

//         colocarNaveEnTablero(
//           fila,
//           columna,
//           longitud,
//           orientacionActual,
//           nuevoTablero
//         );
//       }
//     });

//     setTablero(nuevoTablero);
//     setColocandoNaves(false);
//     setTurnoJugador(true);
//     setNavesColocadas(true);
//   };

//   const esPosicionValida = (fila, columna, longitud, orientacion, tablero) => {
//     const proximidadNaves = (f, c) => {
//       // Código para verificar que no hayan naves pegadas una a otra
//       for (let i = -1; i <= 1; i++) {
//         for (let j = -1; j <= 1; j++) {
//           const nuevaFila = f + i;
//           const nuevaColumna = c + j;

//           if (
//             nuevaFila >= 0 &&
//             nuevaFila < 10 &&
//             nuevaColumna >= 0 &&
//             nuevaColumna < 10 &&
//             tablero[nuevaFila][nuevaColumna].contenido === "nave"
//           ) {
//             return false;
//           }
//         }
//       }
//       return true;
//     };

//     if (orientacion === "horizontal") {
//       for (let i = 0; i < longitud; i++) {
//         if (
//           columna + i >= 10 ||
//           tablero[fila][columna + i].contenido !== null ||
//           !proximidadNaves(fila, columna + i)
//         ) {
//           return false;
//         }
//       }
//     } else {
//       for (let i = 0; i < longitud; i++) {
//         if (
//           fila + i >= 10 ||
//           tablero[fila + i][columna].contenido !== null ||
//           !proximidadNaves(fila + i, columna)
//         ) {
//           return false;
//         }
//       }
//     }
//     return true;
//   };

//   const colocarNaveEnTablero = (
//     fila,
//     columna,
//     longitud,
//     orientacion,
//     tablero
//   ) => {
//     if (orientacion === "horizontal") {
//       for (let i = 0; i < longitud; i++) {
//         tablero[fila][columna + i] = {
//           contenido: "nave",
//           clickeable: false,
//         };
//       }
//     } else {
//       for (let i = 0; i < longitud; i++) {
//         tablero[fila + i][columna] = {
//           contenido: "nave",
//           clickeable: false,
//         };
//       }
//     }
//   };

//   return (
//     <div className="my-5">
//       <div className="contenedor-tablero d-flex justify-content-center">
//         <table className="tablero">
//           <thead>
//             <tr>
//               <th className="etiqueta"></th>
//               {Array.from({ length: 10 }, (_, index) => (
//                 <th key={index} className="etiqueta">
//                   {String.fromCharCode(65 + index)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {tablero.map((fila, rowIndex) => (
//               <tr key={rowIndex}>
//                 <td className="etiqueta">{rowIndex + 1}</td>
//                 {fila.map((cuadrado, colIndex) => (
//                   <td
//                     key={colIndex}
//                     className={`cuadrado ${
//                       cuadrado.clickeable ? "clickeable" : ""
//                     } ${cuadrado.contenido}`}
//                     style={{ backgroundColor: cuadrado.color }}
//                     onClick={() => handleClickCuadro(rowIndex, colIndex)}
//                   ></td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {!esComputadora && mostrarBotonNavesAleatorias && (
//         <button
//           className="btn btn-info mt-5 fw-bold btn-naves-aleatorias"
//           onClick={handleColocarNaves}
//         >
//           Colocar Naves Aleatorias
//         </button>
//       )}
//     </div>
//   );
// };

// export default Juego;
