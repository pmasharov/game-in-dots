import React, { useContext } from 'react';

import AppContext from '../../context';
import { getAreaDynamicStyles } from "../ComponentStyleHelpers"
import { Dot } from '../index';

function createDotsList(size) {
	let result = [];
	for (let i = 0; i < size; i++) {
		result.push(<Dot key={i}/>);
	}
	return result;
}

function Area() {
	const { areaSize } = useContext(AppContext);
	const areaDynamicStyles = getAreaDynamicStyles(areaSize);

	const dotsList = createDotsList(Math.pow(areaSize, 2));

	return (
		<div
			className={'area'}
			style={areaDynamicStyles}>
			{dotsList}
		</div>
	);
}

export default Area;