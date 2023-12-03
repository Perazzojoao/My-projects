import './Numerico.css';
import Botao from '../Botao';

const Numerico = () => {
  return ( 
    <div className='numerico'>
      <Botao value='7'/>
      <Botao value='8'/>
      <Botao value='9'/>
      <Botao value='4'/>
      <Botao value='5'/>
      <Botao value='6'/>
      <Botao value='1'/>
      <Botao value='2'/>
      <Botao value='3'/>
      <Botao value='0'/>
      <Botao value='.'/>
    </div>
   );
}
 
export default Numerico;