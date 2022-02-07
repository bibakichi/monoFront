
import { combineReducers } from 'redux';
//import event from './event';
import license from './license';
import frontPortal from './frontPortal';
import timecard from './timecard';
import machinesRecords from './machinesRecords';
import links from './links';
import imageUploader from './imageUploader';

//親玉Reducer
export default combineReducers({
    //event,
    license,
    frontPortal,
    timecard,
    machinesRecords,
    links,
    imageUploader,
});