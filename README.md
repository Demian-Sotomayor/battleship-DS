# React + Vite

# Para correr el código en codespace:

- Crear codespace en master
- npm install
- npm run dev

# Para correr el código en VSCode desde la terminal (Según mi paso a paso en windows 10):

- Abrir consola.
- Ir a la carpeta deseada (ej: cd carpeta-random).
- git clone https://github.com/Demian-Sotomayor/battleship-DS.git
- cd battleship-DS
- code .

(Dentro de VSCode)
- npm install
- npm run dev

# Integrando información escrita en los pull request que olvidé poner aquí (por el contexto para mostrar un poco qué faltó y qué tengo):

Pull request #1
- Uniendo cambios en rama Dev a Master, lo que hecho ya está funcional y testeado

- Menú simple hecho (img, título + botón de play).
- Tablero avanzado (puedes ver las columnas y filas, las naves correctamente, ninguna nave está al lado de otra y puedes hacerlas aparecer aleatoriamente).
- Actualizando estilos para darle más comodidad visual.
- Rutas creadas con Layout.
- Descargados Bootstrap y para posibles usos a futuro también sweetalert2.

Pull request #2
- Faltó arreglar función de ataque para que sea válido tanto a cuadrado normal como con nave (condicional para que ambos sean clickeables y disparables).

- Pendiente arreglar disparo de máquina (solucionar que los cuadrados de Jugador.jsx no son clickeables para evitar que se dispare a sí mismo, sin embargo, eso generó incompatibilidad y la máquina no encuentra cuadrados clickeables para disparar, faltó cambiar el enfoque para que la máquina dispare a través de otra condición y no si eran clickeables o no.)

- Pendiente hacer condición de victoria.

- Tableros hechos, funciones avanzadas y naves aleatorias para ambos, las naves de la máquina siguen visibles por hacer el desarrollo más fácil al momento de buscarlas para disparar.
