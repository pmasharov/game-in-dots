import { createContext } from 'react';

const initialState = {
	areaSize: 5,
};

const AppContext = createContext(initialState);
export default AppContext;