export const types = {
  ADD_TO_CAUGHT: 'ADD_TO_CAUGHT',
  ADD_TO_MISSED: 'ADD_TO_MISSED',
  SET_USER_NAME: 'SET_USER_NAME',
  GET_LEADERS_DATA: 'GET_LEADERS_DATA',
  CLEAR_DOTS: 'CLEAR_DOTS',
};

function addToCaught(dotIndex) {
  return {
    type: types.ADD_TO_CAUGHT,
    payload: dotIndex,
  };
}
function addToMissed(dotIndex) {
  return {
    type: types.ADD_TO_MISSED,
    payload: dotIndex,
  };
}
function setUserName(name) {
  return {
    type: types.SET_USER_NAME,
    payload: name,
  };
}
function getLeadersData(leadersData) {
  return {
    type: types.GET_LEADERS_DATA,
    payload: leadersData
  };
}
function clearDots() {
  return {
    type: types.CLEAR_DOTS,
  };
}

export {
  addToCaught,
  addToMissed,
  setUserName,
  getLeadersData,
  clearDots,
};
