import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cadastro from './pages/Cadastro';

function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/cadastro' element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
