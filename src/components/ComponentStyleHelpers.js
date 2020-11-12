export const getDotWidth = areaSize => {
	switch (areaSize) {
		case 5:
			return 50;
		case 10:
			return 40;
		case 30:
			return 20;
		default:
			return 50;
	}
}

export const getAreaDynamicStyles = (areaSize) => {
	const dotWidth = getDotWidth(areaSize)
	return {
		width: `${areaSize * dotWidth}px`,
		height: `${areaSize * dotWidth}px`,
	}
}

export const getDynamicDotStyles = areaSize => ({
	width: getDotWidth(areaSize),
	height: getDotWidth(areaSize),
})