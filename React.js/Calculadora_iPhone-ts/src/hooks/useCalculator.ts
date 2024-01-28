import { CalculatorContext } from '@/contexts/CalculatorContext';
import { useContext } from 'react';

export function useCalculator() {
	const { number, setNumber, result, setResult, operatorList } = useContext(CalculatorContext);
	const { exp1 } = result;

	const getScreenValue = () => {
		return number;
	};

	const clearScreen = () => {
		setNumber('0');
    operatorList.current = [''];
		setResult({ exp1: 0, exp2: 0 });
	};

	const percentage = () => {
		setNumber(prev => {
			return String(Number(prev) / 100);
		});
	};

	const setExpression = () => {
		if (!exp1) {
      setResult({ exp1: Number (number), exp2: 0 })
    } else if (exp1) {
      setResult({...result, exp2: Number (number)});
    }
	};

  const expVerify = () => {
    if (exp1) {
      setNumber('0');
    }
  }

	return { getScreenValue, clearScreen, percentage, setExpression, expVerify, operatorList };
}
