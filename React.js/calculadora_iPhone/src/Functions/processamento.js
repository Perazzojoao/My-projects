export function calculo(operador, expressao) {
	let resultado;
  const indice = operador.current.length;
	switch (operador.current[indice - 2]) {
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
	}
	return resultado;
}

export function resetaTela(valor, setScreen) {
  if (valor.valorTela === '') {
    setScreen('');
  }
}

export function mostraTela( screen, expressao) {
  if (screen) {
    return screen;
  } else {
    if (expressao.primaria !== '') {
      return expressao.primaria;
    } else {
      return 0;
    }
  }
}