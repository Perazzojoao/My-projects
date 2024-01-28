import { TResult } from "@/types/TResult";

export function calculo(operador: string, { exp1, exp2 }: TResult) {
  let resultado: null | number = null;
  if (!exp1 || !exp2) return null;
  console.log('Entrando...');
	switch (operador) {
		case '/':
			resultado = exp1 / exp2;
			break;
		case '*':
			resultado = exp1 * exp2;
			break;
		case '-':
			resultado = exp1 - exp2;
			break;
		case '+':
			resultado = exp1 + exp2;
      console.log('calculando...');
			break;
	}
	return resultado;
}