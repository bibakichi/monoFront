
import { combineReducers } from 'redux';
//import event from './event';
import license from './license';
import timecard from './timecard';
import cardReader from './cardReader';
import machinesRecords from './machinesRecords';

//親玉Reducer
export default combineReducers({
    //event,
    cardReader,
    license,
    timecard,
    machinesRecords,
});