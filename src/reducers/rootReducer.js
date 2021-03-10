import { combineReducers } from 'redux';
import flightReducer from './stockReducer';

const rootReducer = combineReducers({ flightReducer });

export default rootReducer;
