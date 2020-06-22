import { useState, useCallback, useEffect } from 'react';

type SetterFunction = (currentValue?: string) => string;
type ReturnType = [string | undefined, (val: string | SetterFunction) => void];

const getLocalStorage = (key: string) => window.localStorage.getItem(key);
const setLocalStorage = (key: string, newValue: string) =>
	window.localStorage.setItem(key, newValue);

const useLocalStorage = (key: string, initialValue?: string): ReturnType => {
	const [currentValue, setCurrentValue] = useState(() => {
		try {
			return initialValue ?? getLocalStorage(key) ?? undefined;
		} catch (error) {
			console.error('localStorage error : ', error);
			return initialValue;
		}
	});

	useEffect(() => {
		if (initialValue) {
			setLocalStorage(key, initialValue);
			setCurrentValue(initialValue);
		}
	}, []);

	const changeValue = useCallback((newValue: string | SetterFunction) => {
		try {
			const valToStore =
				newValue instanceof Function ? newValue(currentValue) : newValue;
			setLocalStorage(key, valToStore);
			setCurrentValue(newValue);
		} catch (error) {
			console.error('localStorage error : ', error);
		}
	}, []);

	return [currentValue, changeValue];
};

export default useLocalStorage;
