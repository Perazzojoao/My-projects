import { TResult } from "@/types/TResult";

export function calculo(operador: string[], { exp1, exp2 }: TResult) {
  let resultado: number = 0;
  if (!exp1 || !exp2) return 0;
	switch (operador[operador.length - 2]) {
		case '/':
			resultado = exp1 / exp2;
			break;
		case 'X':
			resultado = exp1 * exp2;
			break;
		case '-':
			resultado = exp1 - exp2;
			break;
		case '+':
			resultado = exp1 + exp2;
			break;
	}
	return resultado;
}