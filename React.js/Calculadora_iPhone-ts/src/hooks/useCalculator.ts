import { CalculatorContext } from '@/contexts/CalculatorContext';
import { calculo } from '@/functions/process';
import { useContext } from 'react';

export function useCalculator() {
	const { number, setNumber, result, setResult, operator, setOperator } =
		useContext(CalculatorContext);
	const { exp1, exp2 } = result;

	const getScreenValue = () => {
		if (exp1 && number === '0') {
			return exp1;
		}
		return number;
	};

	const clearScreen = () => {
		setNumber('0');
		setOperator(['']);
		setResult({ exp1: 0, exp2: 0 });
	};

	const percentage = () => {
		if (number === '0') {
			setResult(prev => ({ exp1: prev.exp1 / 100, exp2: 0 }));
			return;
		}
		setNumber(prev => {
			return String(Number(prev) / 100);
		});
	};

	const negative = () => {
		if (number === '0') {
			setResult(prev => ({ exp1: prev.exp1 * -1, exp2: 0 }));
		}
		setNumber(prev => {
			return String(Number(prev) * -1);
		});
	};

	const setExpression = () => {
		if (!exp1) {
			setResult({ exp1: Number(number), exp2: 0 });
		} else if (exp1) {
			setResult({ ...result, exp2: Number(number) });
		}
		setNumber('0');
	};

	const doTheMath = () => {
		if (exp2) {
			setResult({ exp1: calculo(operator, result), exp2: 0 });
		}
	};

	const expVerify = () => {
		if (exp1) {
			setNumber('0');
		}
	};

	return { getScreenValue, clearScreen, percentage, negative, setExpression, doTheMath, expVerify };
}
