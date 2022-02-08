
import { combineReducers } from 'redux';
import links from './links';
import imageUploader from './imageUploader';

//親玉Reducer
export default combineReducers({
    links,
    imageUploader,
});