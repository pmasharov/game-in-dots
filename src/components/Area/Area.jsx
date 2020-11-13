import React from 'react';
import { connect } from 'react-redux';

import { getAreaDynamicStyles } from "../ComponentStyleHelpers"
import { Dot } from '../index';

function createDotsList({
													size,
													activeDotIndex,
													isGameStarted,
													dotClick,
													caughtList,
													missedList
												}) {
	let result = [];
	for (let i = 0; i < size; i++) {
		result.push(
			<Dot
				key={i}
				dotIndex={i}
				isActive={isGameStarted && activeDotIndex === i}
				isMissed={isGameStarted && missedList.includes(i)}
				isCaught={isGameStarted && caughtList.includes(i)}
				dotClick={dotClick}
			/>
		);
	}
	return result;
}

function Area({
								caughtList,
								missedList,
								activeDotIndex,
								gameMode: {
									field: areaSize,
								},
								gameStatus: {
									isGameStarted
								},
								dotClick
							}) {
	const areaDynamicStyles = getAreaDynamicStyles(areaSize);
	const dotsList = createDotsList({
		size: Math.pow(areaSize, 2),
		activeDotIndex: activeDotIndex,
		isGameStarted: isGameStarted,
		dotClick: dotClick,
		caughtList: caughtList,
		missedList: missedList,
	});
	return (
		<div
			className={'area'}
			style={areaDynamicStyles}
		>
			{dotsList}
		</div>
	);
}

export default connect(state => ({
	gameMode: state.gameMode,
	gameStatus: state.gameStatus
}))(Area);