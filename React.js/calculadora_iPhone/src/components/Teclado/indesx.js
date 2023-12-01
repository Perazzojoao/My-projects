import Acoes from '../Acoes';
import Numerico from '../Numerico';
import Operadores from '../Operadores';
import './Teclado.css';

const Teclado = () => {
  
  const enviaValor = (evento) => {
    evento.preventDefault()
  }

  return ( 
    <div className='teclado'>
      <form onSubmit={evento => enviaValor(evento)}>
        <Acoes/>
        <Numerico/>
        <Operadores/>
      </form>
    </div>
   );
}
 
export default Teclado;