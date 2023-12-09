import { useContext, useEffect, useRef, useState } from 'react';
import { ValorContext } from '../../App';
import { calculo, mostraTela, resetaTela } from '../../Functions/processamento';
import './Tela.css';

const Tela = () => {
	const valor = useContext(ValorContext);
	const [screen, setScreen] = useState('');
	const [expressao, setExpressao] = useState({ primaria: '', secundaria: '' });
	const operador = useRef(['']);
	let resultado;

	useEffect(() => {
		resetaTela(valor, setScreen);
	}, [expressao]);

	useEffect(() => {
		if (valor.valorTela >= 0 && valor.valorTela <= 9) {
			if (screen === '0') setScreen('');
			setScreen((valorAntigo) => valorAntigo + valor.valorTela);

			if (expressao.secundaria) {
				resultado = calculo(operador, expressao);
				setExpressao({ primaria: resultado, secundaria: '' });
			}
		} else {
			switch (valor.valorTela) {
				case 'C':
					setScreen(0);
					setExpressao({ primaria: '', secundaria: '' });
					operador.current = [''];
					break;
				case '+/-':
					if (operador.current[operador.current.length-1] !== '='){
						setScreen((valorAntigo) => String(-1 * Number(valorAntigo)));
          } else {
            setExpressao(antigo => ({primaria: -1 * antigo.primaria}));
          }
					break;
				case '%':
          if (operador.current[operador.current.length-1] !== '=') {
            setScreen((valorAntigo) => String(0.01 * Number(valorAntigo)));
          } else {
            setExpressao(antigo => ({primaria: 0.01 * antigo.primaria}));
          }
					break;
				case '.':
					if (!screen.includes('.')) {
						setScreen((valorAntigo) => valorAntigo + '.');
					}
					break;
				default:
					if (!expressao.primaria) {
						setExpressao({ ...expressao, primaria: Number(screen) });
					} else if (expressao.primaria) {
						setExpressao({ ...expressao, secundaria: Number(screen) });
					}
					operador.current.push(valor.valorTela);
					break;
			}
		}

		valor.setValorTela('');
	}, [valor]);

	return (
		<div className='tela'>
			<input name='tela' value={mostraTela(screen, expressao)} readOnly></input>
		</div>
	);
};

export default Tela;
