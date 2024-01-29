import React from 'react'
import { Link } from 'react-router-dom';

const Tablero = () => {
  return (
    <div className='mt-3'>
    <h2>Tablero</h2>
    <Link to="/" className='btn btn-dark mt-5'>
        Regresar al menu
    </Link>
    </div>

  )
}

export default Tablero;