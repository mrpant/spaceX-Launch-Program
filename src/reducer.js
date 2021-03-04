import { combineReducers } from "redux";
import appReducer from './client/reducer/appReducer';

// TODO : Common for all reducer to set here.
const REDUCERS = {
    appReducer
}


export default combineReducers({
    ...REDUCERS
});