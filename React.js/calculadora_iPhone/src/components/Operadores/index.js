import Botao from '../Botao';
import './Operadores.css';

const Operadores = () => {
  return ( 
    <aside className='operadores'>
      <Botao value='/'/>
      <Botao value='x'/>
      <Botao value='-'/>
      <Botao value='+'/>
      <Botao value='='/>
    </aside>
   );
}
 
export default Operadores;