import { TResult } from '@/types/TResult';
import { ReactNode, createContext, useRef, useState } from 'react';

type CalcProps = {
	children: ReactNode;
};

type Context = {
	number: string;
	setNumber: React.Dispatch<React.SetStateAction<string>>;
	action: string;
	setAction: React.Dispatch<React.SetStateAction<string>>;
	operator: string;
	setOperator: React.Dispatch<React.SetStateAction<string>>;
	operatorList: React.MutableRefObject<string[]>;
	result: TResult;
	setResult: React.Dispatch<React.SetStateAction<TResult>>;
};

export const CalculatorContext = createContext({} as Context);
CalculatorContext.displayName = 'Calculator';

const CalculatorProvider = ({ children }: CalcProps) => {
	const [number, setNumber] = useState('0');
	const [action, setAction] = useState('');
	const [operator, setOperator] = useState('');
  const operatorList = useRef(['']);
	const [result, setResult] = useState<TResult>({exp1: 0, exp2: 0});
	return (
		<CalculatorContext.Provider
			value={{ number, setNumber, action, setAction, operator, setOperator,operatorList, result, setResult }}
		>
			{children}
		</CalculatorContext.Provider>
	);
};

export default CalculatorProvider;
