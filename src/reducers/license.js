import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = null;

export default handleActions({
    //============================================================
    [actions.license.get]: (state, { payload: { userId } }) => {
        return state;
    },
    //============================================================
}, defaultState);