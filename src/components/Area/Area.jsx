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
								gameSettings,
								gameMode,
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
	const getAreaSizeMark = gameMode => {
		const gameSettingsValues = Object.values(gameSettings)
		const sameGameSettingsValue = gameSettingsValues.filter(item => item.field === gameMode.field)[0]
		const currentModeKey = Object.keys(gameSettings).find(key => gameSettings[key].field === sameGameSettingsValue.field)
		return currentModeKey.replace('Mode', '')
	}
	const areaSizeMark = getAreaSizeMark(gameMode)
	return (
		<div
			className={`area ${areaSizeMark}`}
			style={areaDynamicStyles}
		>
			{dotsList}
		</div>
	);
}

export default connect(state => ({
	gameMode: state.gameMode,
	gameStatus: state.gameStatus,
	gameSettings: state.gameSettings,
}))(Area);