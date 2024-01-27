import { useCalculator } from "@/hooks/useCalculator";

const Screen = () => {
  const { getScreenValue } = useCalculator();
  const screenValue = getScreenValue();

	return (
		<div className='text-end mt-[20%] sm:mt-[51.7%] xl:mt-[25%]'>
			<span className='text-7xl xl:text-9xl md:text-8xl px-8 xl:pr-20'>
				{screenValue}
			</span>
		</div>
	);
};

export default Screen;
