
import { combineReducers } from 'redux';
//import event from './event';
import license from './license';
import timecard from './timecard';

//親玉Reducer
export default combineReducers({
    //event,
    user: combineReducers({
        license,
        timecard,
    }),
});