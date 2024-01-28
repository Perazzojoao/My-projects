import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import CalculatorProvider from './contexts/CalculatorContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
		<CalculatorProvider>
			<App />
		</CalculatorProvider>
);
