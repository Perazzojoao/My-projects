import Screen from '@/components/screen';
import KeyBoard from './components/KeyBoard';
import { useContext, useEffect } from 'react';
import { CalculatorContext } from './contexts/CalculatorContext';
import { useCalculator } from './hooks/useCalculator';

function App() {
  const { action, setAction, operator } = useContext(CalculatorContext);
  const { clearScreen, percentage, setExpression, operatorList } = useCalculator();

  useEffect(() => {
    if (action === 'AC') {
      clearScreen();
    } else if (action === '%') {
      percentage();
    }
    setAction('');
  }, [action]);

  useEffect(() => {
    if (operatorList.current[operatorList.current.length - 1] !== '') {
      setExpression();
    }
  }, [operator]);

	return (
			<div className='container'>
				<Screen />
				<KeyBoard />
			</div>
	);
}

export default App;
