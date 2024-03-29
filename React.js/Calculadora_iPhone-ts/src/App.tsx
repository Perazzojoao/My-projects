import Screen from '@/components/screen';
import KeyBoard from './components/KeyBoard';
import { useContext, useEffect } from 'react';
import { CalculatorContext } from './contexts/CalculatorContext';
import { useCalculator } from './hooks/useCalculator';

function App() {
	const { action, setAction, operator, number } = useContext(CalculatorContext);
	const { clearScreen, percentage, negative, setExpression, doTheMath } = useCalculator();

	useEffect(() => {
		if (action === 'AC') {
			clearScreen();
		} else if (action === '%') {
			percentage();
		} else if (action === '+/-') {
      negative();
    }
		setAction('');
	}, [action]);

	useEffect(() => {
    setExpression();
	}, [operator]);

  useEffect(() => {
    doTheMath();
  }, [operator, number]);

	return (
		<div className='container'>
			<Screen />
			<KeyBoard />
		</div>
	);
}

export default App;
