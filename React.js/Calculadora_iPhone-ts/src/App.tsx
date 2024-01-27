import Screen from '@/components/screen';
import KeyBoard from './components/KeyBoard';
import { useContext, useEffect } from 'react';
import { CalculatorContext } from './contexts/CalculatorContext';
import { useCalculator } from './hooks/useCalculator';

function App() {
  const { action, setAction } = useContext(CalculatorContext);
  const { clearScreen, percentage } = useCalculator();

  useEffect(() => {
    if (action === 'AC') {
      clearScreen();
    } else if (action === '%') {
      percentage();
    }
    setAction('');
  }, [action]);

	return (
			<div className='container'>
				<Screen />
				<KeyBoard />
			</div>
	);
}

export default App;
