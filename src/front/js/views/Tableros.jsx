import React from 'react'
import { Link } from 'react-router-dom';
import Juego from '../components/Juego';

const Tableros = () => {
  return (
    <>
    <h2>Tableros (jugador y computadora)</h2>

    <Juego />

    <Link to="/" className='btn btn-dark mt-5'>
        Regresar al menu
    </Link>
    </>

  )
}

export default Tableros;