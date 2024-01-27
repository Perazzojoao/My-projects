import { ReactNode, createContext, useState } from 'react';

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
	result: number;
	setResult: React.Dispatch<React.SetStateAction<number>>;
};

export const CalculatorContext = createContext({} as Context);

const CalculatorProvider = ({ children }: CalcProps) => {
	const [number, setNumber] = useState('0');
	const [action, setAction] = useState('');
	const [operator, setOperator] = useState('');
	const [result, setResult] = useState(0);
	return (
		<CalculatorContext.Provider
			value={{ number, setNumber, action, setAction, operator, setOperator, result, setResult }}
		>
			{children}
		</CalculatorContext.Provider>
	);
};

export default CalculatorProvider;
