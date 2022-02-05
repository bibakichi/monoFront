import { handleActions } from 'redux-actions';
import actions from '../actions';

const defaultState = {
    userId: '',
};

export default handleActions({
    //============================================================
    [actions.cardReader.setUserId]: (state, { payload: { userId } }) => {
        return {
            ...state,
            userId,
        };
    },
    //============================================================
}, defaultState);
