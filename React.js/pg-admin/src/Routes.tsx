import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Login from './pages/Login';
import DBProvider from './contexts/DBProvider';

function AppRouter() {

  return (
    <BrowserRouter>
      <DBProvider>
        <Routes>
          <Route path='/admin/home' element={<Home />} />
          <Route path='/cadastrar' element={<Cadastro />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </DBProvider>
    </BrowserRouter>
  )
}

export default AppRouter
