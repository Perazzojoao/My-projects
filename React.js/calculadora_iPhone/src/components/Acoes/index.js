import Botao from '../Botao';
import './Acoes.css';

const Acoes = () => {
  return ( 
    <header className='acoes'>
      <Botao value='C'/>
      <Botao value='+/-'/>
      <Botao value='%'/>
    </header>
   );
}
 
export default Acoes;