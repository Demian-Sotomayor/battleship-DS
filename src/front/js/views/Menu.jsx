import React from 'react'
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className='mt-3'>
    <h2>Menu</h2>
    <Link to="/tablero" className='btn btn-dark mt-5'>
      Ir a tablero
    </Link>

    </div>
  )
}

export default Menu;