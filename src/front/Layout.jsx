import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './js/views/Menu';
import Tablero from './js/views/Tablero';
import Navbar from './js/components/Navbar';

const Layout = () => {

    const basename = "/"

  return (
    <div className='img-fondo'>
        <BrowserRouter basename={basename}>
            <Navbar/>
            <Routes>
                <Route element={<Menu />} path='/' />
                <Route element={<Tablero />} path='/tablero' />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Layout;