import React, { useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

function App() {
	const [theme, setTheme] = useLocalStorage('theme');

	useEffect(() => {
		console.log(theme);
	}, [theme]);

	return <div className='App'></div>;
}

export default App;
