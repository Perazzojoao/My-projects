import { useContext, useEffect, useState } from 'react';
import { ValorContext } from '../../App';
import './Tela.css';

const Tela = () => {
  
  const valor = useContext(ValorContext);
  const [screen, setScreen] = useState('');
  
  useEffect(() => {
    let expressao1, expressao2;

    if(valor.valorTela >= 0 && valor.valorTela <= 9) {
      if(screen === '0') setScreen('');
      setScreen(valorAntigo => valorAntigo + valor.valorTela);
    } else {
      switch (valor.valorTela) {
        case 'C':
          setScreen('0');
          break;
        case '+/-':
          setScreen(valorAntigo => String(-1 * Number(valorAntigo)));
          break;
        case '%':
          setScreen(valorAntigo => String(0.01 * Number(valorAntigo)));
          break;
        case '.':
          if(!screen.includes('.')) {
            setScreen(valorAntigo => valorAntigo + '.');
          }
          break;
          default:
          expressao1 = Number(screen);

          switch (valor.valorTela) {
            case '/':
              console.log('ok');
              break;
            case 'x':
              
              break;
            case '-':
              
              break;
            case '+':
              
              break;
            case '=':
              
              break;
          }
          break;
      }
    }

    if(expressao1 !== undefined) {
      console.log(expressao1);
      console.log(valor);
    }
    valor.setValorTela('');
  }, [valor]);

    

  return ( 
    <div className='tela'>
      <input name='tela' value={screen ? screen : 0} readOnly></input>
    </div>
   );
}
 
export default Tela;