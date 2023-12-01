import { useContext } from 'react';
import './Botao.css';
import { ValorContext } from '../../App';

const Botao = ({value}) => {

   const valor = useContext(ValorContext);
   
   const alteraValor = () => {
      valor.setValorTela(value);
   }

  return ( 
      <button onClick={alteraValor} className={`botao-${value}`} name={value} defaultValue={value}>{value}</button>
   );
}
 
export default Botao;