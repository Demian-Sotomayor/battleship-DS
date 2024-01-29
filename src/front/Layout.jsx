import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './js/views/Menu';
import Tableros from './js/views/Tableros';

const Layout = () => {

    const basename = "/"

  return (
    <div className='img-fondo'>
        <BrowserRouter basename={basename}>
            <Routes>
                <Route element={<Menu />} path='/' />
                <Route element={<Tableros />} path='/tableros' />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Layout;