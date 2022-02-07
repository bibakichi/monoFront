import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = {};

export default handleActions({
    //============================================================
    [actions.imageUploader.uploaded]: (state, { payload: { success, url } }) => {
        return {
            ...state,
            [url]: success,
        };
    },
    //============================================================
}, defaultState);
