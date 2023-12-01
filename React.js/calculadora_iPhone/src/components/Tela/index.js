import { useContext } from 'react';
import { ValorContext } from '../../App';
import './Tela.css';

let memoria = [];

const Tela = () => {
  
  const valor = useContext(ValorContext)
  
  const mostraValor = () => {

    let expressao = valor.valorTela;

    memoria.push(expressao);
    const numeros = memoria.filter(digito => digito === 0 || digito <= 9);
    const operadores = memoria.filter(digito => Number(digito) ? '' : digito);
    console.log(numeros.map(digito => Number(digito)));
    console.log(operadores);

    return expressao;
  }

  return ( 
    <div className='tela'>
      <input name='tela' value={mostraValor()} readOnly></input>
    </div>
   );
}
 
export default Tela;