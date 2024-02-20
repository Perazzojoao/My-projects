import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';

function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastrar' element={<Cadastro />} />
        <Route path='/admin/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
