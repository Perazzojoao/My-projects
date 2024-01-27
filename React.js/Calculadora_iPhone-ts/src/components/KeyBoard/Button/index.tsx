import { CalculatorContext } from '@/contexts/CalculatorContext';
import { setLogicNumber } from '@/functions/setLogicNumber';
import { useCallback, useContext } from 'react';

type ButtonProps = {
	value: string;
	category: 'numeric' | 'action' | 'operation';
};

const Button = ({ value, category }: ButtonProps) => {
	const { setNumber, setAction, setOperator } = useContext(CalculatorContext);
	const textColor = category === 'action' ? 'text-black-100' : '';
	const bgColor =
		category === 'action' ? 'bg-gray-100' : category === 'operation' ? 'bg-orange-100' : '';
	let zeroStyle = '';

	if (value === '0') {
		zeroStyle = 'col-span-2';
	}

	const setValue = useCallback(
		(value: string) => {
			if (category === 'numeric') {
          setNumber(prev => setLogicNumber(prev, value));
			} else if (category === 'action') {
				setAction(value);
			} else {
				setOperator(value);
			}
		},
		[value]
	);

	return (
		<div
			className={`
        bg-black-200 ${bgColor} 
        rounded-full 
        min-h-18 md:h-20 lg:h-22 xl:min-h-[110px] 
        flex justify-center align-middle 
        ${zeroStyle}
        hover:bg-opacity-50
        cursor-pointer
      `}
			onClick={() => setValue(value)}
		>
			<button className={`text-4xl xl:text-5xl ${textColor}`} value={value}>
				{value}
			</button>
		</div>
	);
};

export default Button;
