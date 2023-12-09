import { useContext, useEffect, useRef, useState } from 'react';
import { ValorContext } from '../../App';
import './Tela.css';

const Tela = () => {
  
  const valor = useContext(ValorContext);
  const [screen, setScreen] = useState('');
  const [expressao, setExpressao] = useState({primaria: '', secundaria: ''});
  const operador= useRef(['']);
  let resultado;

  useEffect(() => {
    if(valor.valorTela === '') {
      setScreen('');
    }
  }, [expressao]);
  
  useEffect(() => {

    if(valor.valorTela >= 0 && valor.valorTela <= 9) {
      if(screen === '0') setScreen('');
      setScreen(valorAntigo => valorAntigo + valor.valorTela);

      if(expressao.secundaria) {
        const indice = operador.current.length
        resultado = calculo(indice - 2);
        setExpressao({primaria: resultado, secundaria: ''});
      }
    } else {
      switch (valor.valorTela) {
        case 'C':
          setScreen(0);
          setExpressao({primaria: '', secundaria: ''});
          operador.current = [''];
          break;
        case '+/-':
          if(!expressao.primaria) {
            setScreen(valorAntigo => String(-1 * Number(valorAntigo)));
          } else {
            setExpressao(antigo => ({primaria: -1 * antigo.primaria}));
          }
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
            if(!expressao.primaria) {
              setExpressao({...expressao , primaria: Number(screen)});
            } else if(expressao.primaria) {
              setExpressao({...expressao , secundaria: Number(screen)});
            }
              operador.current.push(valor.valorTela);
              console.log(operador.current);
          break;
      }
    }

    if(expressao.primaria !== '') {
      console.log(expressao);
    }
    
    valor.setValorTela('');
  }, [valor]);

  function mostraTela() {
    if(screen) {
      return screen;
    } else {
      if(expressao.primaria !== '') {
        return expressao.primaria;
      } else {
        return 0;
      }
    }
  }

  function calculo(indice) {
    let resultado;
    switch (operador.current[indice]) {
      case '/':
      resultado = expressao.primaria / expressao.secundaria;
      break;
      case '*':
      resultado = expressao.primaria * expressao.secundaria;
      break;
      case '-':
      resultado = expressao.primaria - expressao.secundaria;
      break;
      case '+':
      resultado = expressao.primaria + expressao.secundaria;
      break;
      default:
        break;
    }
    return resultado;
  }

  return ( 
    <div className='tela'>
      <input name='tela' value={mostraTela()} readOnly></input>
    </div>
   );
}
 
export default Tela;