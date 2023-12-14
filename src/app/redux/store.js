import { legacy_createStore as createStore } from 'redux';
import timerReducer from './reducers';

const store = createStore(timerReducer);

export default store;
