import { useContext } from 'react';
import { ValorContext } from '../../App';
import './Botao.css';

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