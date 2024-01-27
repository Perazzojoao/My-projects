type ButtonProps = {
	value: string;
	category: 'numeric' | 'action' | 'operation';
};

const Button = ({ value, category }: ButtonProps) => {
	const textColor = category === 'action' ? 'text-black-100' : '';
	const bgColor =
		category === 'action' ? 'bg-gray-100' : category === 'operation' ? 'bg-orange-100' : '';
	let zeroStyle = '';

	if (value === '0') {
		zeroStyle = 'col-span-2';
	}

	return (
		<div
			className={`
        bg-black-200 ${bgColor} 
        rounded-full 
        min-h-18 md:h-20 lg:h-22 xl:min-h-[110px] 
        flex justify-center align-middle 
        ${zeroStyle}
        hover:bg-opacity-50
      `}
		>
			<button className={`text-4xl xl:text-5xl ${textColor}`} value={value}>
				{value}
			</button>
		</div>
	);
};

export default Button;
