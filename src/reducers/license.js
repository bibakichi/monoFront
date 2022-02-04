import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = null;

export default handleActions({
    //============================================================
    [actions.user.license.get]: (state, { payload: { userId } }) => {
        return state;
    },
    //============================================================
}, defaultState);