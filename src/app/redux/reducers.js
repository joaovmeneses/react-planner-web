const initialState = {
  isRunning: false,
};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_TIMER':
      return { ...state, isRunning: true };
    case 'PAUSE_TIMER':
      return { ...state, isRunning: false };
    case 'STOP_TIMER':
      return { ...state, isRunning: false };
    default:
      return state;
  }
};

export default timerReducer;  