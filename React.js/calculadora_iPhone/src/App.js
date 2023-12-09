import React, { useState } from 'react';
import './App.css';
import Teclado from './components/Teclado/indesx';
import Tela from './components/Tela';

export const ValorContext = React.createContext();

function App() {

  const [valorTela, setValorTela] = useState('');

  
  return (
    <div className="App">
      <fieldset className="container">
        <ValorContext.Provider value={{valorTela, setValorTela,}}>
          <Tela/>
          <Teclado/>
        </ValorContext.Provider>
      </fieldset>
    </div>
  );
}

export default App;
